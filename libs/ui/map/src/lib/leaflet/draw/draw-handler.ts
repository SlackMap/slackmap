import * as L from "leaflet";
import "./draw-customs";
import { DrawType, DrawData, DrawHandler } from "../../ui-map.models";
import { Observable, ReplaySubject } from 'rxjs';

/**
  * handler for drawing or editing shapes on map
  *
  * @param {*} map L.Map
  * @param {*} type SpotCategory
  * @param {*} shape geojson shape to edit
  */
export function drawHandler(map: L.Map, type: DrawType, shape): Observable<DrawHandler> {
  return new Observable<DrawHandler>(subscriber => {
    const data$ = new ReplaySubject<DrawData>(1);
    let vertexCount = 0,
      distance = 0,
      layer;

    // from leaflet-draw-customs.js
    // blocks middle marker on line drawing
    L.Edit.noMiddleMarker = type === DrawType.LINE ? true : false;

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
      if (shape && shape.coordinates) {
        /**
         * edit existing shape
         */
        if (type === DrawType.AREA) {
          layer = L.GeoJSON.geometryToLayer(shape);
        } else {
          // @ts-ignore
          layer = new L.Polyline(L.GeoJSON.coordsToLatLngs(shape.coordinates), L.Draw.Polyline.prototype.options.shapeOptions);
        }
        features.addLayer(layer);

        map.on(L.Draw.Event.EDITVERTEX, onEdited);
        drawControl._toolbars.edit._modes.edit.handler.enable();
        // fitBounds(); moved outside
      } else {
        /**
         * draw new shape
         */
        if (type === DrawType.AREA) {
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
      (vertexCount = 0), (distance = 0), drawControl._toolbars.draw._modes.polygon.handler.disable();
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
      let newShape = null,
        coordinates = null;
      if (layer) {
        vertexCount = layer.getLatLngs().length;
        newShape = layer.toGeoJSON().geometry;

        // this is leaflet or leaflet-draw bug
        // bounds does not update when the shape is edited, but layer shape is correct
        // so we have to transform it to get the coordinates
        let l;
        if (type === DrawType.AREA) {
          l = L.GeoJSON.geometryToLayer(newShape);
        } else {
          // @ts-ignore
          l = new L.Polyline(L.GeoJSON.coordsToLatLngs(newShape.coordinates), L.Draw.Polyline.prototype.options.shapeOptions);
        }
        coordinates = l
          .getBounds()
          .getCenter()
          .toGeoJSON().geometry;

        // calculate line length
        if (type === DrawType.LINE) {
          const latlngs = layer.getLatLngs();
          distance = latlngs[0].distanceTo(latlngs[1]).toFixed(2);
        }
      }

      data$.next({
        type,
        vertexCount: vertexCount,
        distance: distance,
        coordinates: coordinates,
        shape: newShape
      });
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

    subscriber.next({
      undo,
      completeShape,
      reset,
      data$: data$.asObservable()
    });

    return () => {
      stop();
      data$.complete()
      map.removeLayer(features);
      map.removeControl(drawControl);
    }
  });
}
