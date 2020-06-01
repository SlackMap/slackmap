import * as L from "leaflet";
import "./draw-customs";
import { DrawType, DrawData, DrawHandler, DrawGeometry } from "../../+map";
import { Observable, ReplaySubject } from 'rxjs';
import { GeoJSON } from '@slackmap/gis';

interface DrawLayer extends L.Layer {
  getLatLngs: () => L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  getBounds: () => L.LatLngBounds;
  toGeoJSON: () => GeoJSON.Feature<any>;
}

/**
  * handler for drawing or editing shapes on map
  *
  * @param {*} map L.Map
  * @param {*} type DrawType
  * @param {*} geometry supported geojson Geometry to edit
  */
export function drawHandler(map: L.Map, type: DrawType, geometry?: DrawGeometry): Observable<DrawHandler> {
  return new Observable<DrawHandler>(subscriber => {
    if(!map) {
      return subscriber.error(new Error('drawHandler(map, type, geometry) requires L.Map to be provided'));
    }
    if(!type) {
      return subscriber.error(new Error('drawHandler(map, type, geometry) requires DrawType to be provided'));
    }

    let vertexCount = 0,
      distance = 0,
      layer: DrawLayer;

    // from leaflet-draw-customs.js
    // blocks middle marker on line drawing
    L.Edit.noMiddleMarker = (type === DrawType.LINE) ? true : false;

    // hide draw toolbar
    map._container.classList.add('hide-draw-toolbar');

    /**
     * layer to draw features on
     */
    const features = L.featureGroup();
    map.addLayer(features);

    /**
     * draw controll
     */
    const drawControl: any = new L.Control.Draw({
      edit: {
        featureGroup: features,
        remove: false
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true
        }
      }
    });
    map.addControl(drawControl);

    // GO GO GO
    start();

    /**
     * start the process of draw/edit
     */
    function start() {
      if (geometry && geometry.coordinates) {
        /**
         * edit existing shape
         */
        if (type === DrawType.POLYGON) {
          layer = L.GeoJSON.geometryToLayer({type: 'Feature', geometry, properties: {}}) as L.Polygon;
        } else {
          layer = new L.Polyline(L.GeoJSON.coordsToLatLngs(geometry.coordinates));
        }
        features.addLayer(layer);

        map.on(L.Draw.Event.EDITVERTEX, onEdited);
        drawControl._toolbars.edit._modes.edit.handler.enable();
        // fitBounds(); moved outside
        // fireChange();
      } else {
        /**
         * draw new shape
         */
        if (type === DrawType.POLYGON) {
          drawControl._toolbars.draw._modes.polygon.handler.enable();
        } else {
          drawControl._toolbars.draw._modes.polyline.handler.enable();
        }
        map.on(L.Draw.Event.CREATED, onCreated);
        map.on(L.Draw.Event.DRAWVERTEX, onProgress);
      }
    }

    /**
     * clean and stop drawing/editing
     */
    function stop() {
      if (layer) {
        features.removeLayer(layer);
        layer = null;
      }
      vertexCount = 0;
      distance = 0;
      drawControl._toolbars.draw._modes.polygon.handler.disable();
      drawControl._toolbars.draw._modes.polyline.handler.disable();
      map.off(L.Draw.Event.CREATED, onCreated);
      map.off(L.Draw.Event.DRAWVERTEX, onProgress);
      map.off(L.Draw.Event.EDITVERTEX, onEdited);
    }

    /**
     * onCreated - handle dreation of new shape
     */
    function onCreated(event) {
      layer = event.layer;
      features.addLayer(layer);
      map.off(L.Draw.Event.CREATED, onCreated);
      map.on(L.Draw.Event.EDITVERTEX, onEdited);
      drawControl._toolbars.edit._modes.edit.handler.enable();
      fireChange();
    }

    /**
     * onProgress - handle draw progress, for line stop after 2nd click
     */
    function onProgress(e) {
      vertexCount = e.layers.getLayers().length;
      if (type === DrawType.LINE && vertexCount >= 2) {
        // if you fire completeShape inside L.Draw.Event.DRAWVERTEX handler, you will get error
        // that's why we have to use setTimeout
        setTimeout(() => {
          drawControl._toolbars.draw._modes.polyline.handler.completeShape();
        }, 0);
      } else {
        fireChange();
      }
    }

    /**
     * onEdited - handle edit changes
     */
    function onEdited() {
      fireChange();
    }

    // fire change
    function fireChange() {
      let newGeometry: DrawGeometry = null,
        bbox: GeoJSON.BBox = null,
        center: GeoJSON.Point = null;
      if (layer) {
        if (type === DrawType.POLYGON) {
          vertexCount = (layer.getLatLngs() as L.LatLng[][])[0].length;
        } else {
          vertexCount = (layer.getLatLngs() as L.LatLng[]).length;
        }
        newGeometry = layer.toGeoJSON().geometry;

        // this is leaflet or leaflet-draw bug
        // bounds does not update when the shape is edited, but layer shape is correct
        // so we have to transform it to get the coordinates
        let l: DrawLayer;
        if (type === DrawType.POLYGON) {
          l = L.GeoJSON.geometryToLayer({type: 'Feature', geometry: newGeometry, properties: {}}) as L.Polyline;
        } else {
          l = new L.Polyline(L.GeoJSON.coordsToLatLngs(newGeometry.coordinates));
        }
        center = l
          .getBounds()
          .getCenter()
          .toGeoJSON().geometry;
        bbox = l
          .getBounds()
          .toGeoJSON();

        // calculate line length
        if (type === DrawType.LINE) {
          const latlngs = layer.getLatLngs() as L.LatLng[];
          distance = Number(latlngs[0].distanceTo(latlngs[1]).toFixed(2));
        }
      }

      subscriber.next({
        type,
        undo,
        completeShape,
        reset,
        data: {
          type,
          vertexCount,
          distance,
          bbox,
          center,
          geometry: newGeometry
        },
      })
    }

    function undo() {
      try {
        drawControl._toolbars.draw._modes.polygon.handler.deleteLastVertex();
      } catch (err) { }
    }

    function completeShape() {
      try {
        drawControl._toolbars.draw._modes.polygon.handler.completeShape();
      } catch (err) { }
    }

    function reset() {
      stop();
      start();
      fireChange();
    }
    setTimeout(() => fireChange(), 0)

    return () => {
      stop();
      map.removeLayer(features);
      map.removeControl(drawControl);
    }
  });
}
