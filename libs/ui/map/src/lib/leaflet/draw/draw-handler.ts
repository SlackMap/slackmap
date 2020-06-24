import * as L from "leaflet";
import "./draw-customs";
import { DrawType, DrawHandler, DrawGeometry, DrawData } from "../../+map";
import { Observable, BehaviorSubject } from 'rxjs';
import { GeoJSON } from '@slackmap/gis';
import * as ngeohash from 'ngeohash';
import { DrawMapEvents, ShapeType, DrawLayer, DrawLayerEvents, PmHandler } from './draw-customs';

/**
  * handler for drawing or editing shapes on map
  *
  * @param {*} map L.Map
  * @param {*} type DrawType
  * @param {*} geometry supported geojson Geometry to edit
  */
export function drawHandler(map: L.Map, type: DrawType): Observable<DrawHandler> {
  return new Observable<DrawHandler>(subscriber => {
    if (!map) {
      return subscriber.error(new Error('drawHandler(map, type, geometry) requires L.Map to be provided'));
    }
    if (!type) {
      return subscriber.error(new Error('drawHandler(map, type, geometry) requires DrawType to be provided'));
    }

    let shapeType: ShapeType, drawOptions: L.PM.DrawOptions;
    let handler: PmHandler;
    if (type === DrawType.LINE) {
      shapeType = 'Line';
      drawOptions = {
        snappable: true,
        snapDistance: 20,
      };
      handler = map.pm.Draw.Line;
    } else if (type === DrawType.AREA) {
      shapeType = 'Polygon';
      drawOptions = {
        snappable: true,
        snapDistance: 20,
      };
      handler = map.pm.Draw.Polygon;
    } else if (type === DrawType.POINT) {
      shapeType = 'Marker';
      drawOptions = {
        snappable: true,
        snapDistance: 20,
      };
      handler = map.pm.Draw.Marker;
    } else {
      return subscriber.error(new Error(`drawHandler DrawType "${type}" is not supported`));
    }

    const emptyData: DrawData = {
      bbox: null,
      distance: 0,
      vertexCount: 0,
      geohash: null,
      geometry: null,
      position: null,
      type,
    }
    const data$$ = new BehaviorSubject<DrawData>(emptyData);

    function enable() {
      console.log('ENABLE', type)
      //@ts-ignore
      map.on(DrawMapEvents.DRAW_START, onStart);
      //@ts-ignore
      map.on(DrawMapEvents.CREATE, onCreated);

      handler.enable(drawOptions);

    }
    function disable() {
      console.log('DISABLE', type)
      handler.disable();
      //@ts-ignore
      map.off(DrawMapEvents.CREATE, onCreated);
      //@ts-ignore
      map.off(DrawMapEvents.DRAW_START, onStart);
    }

    function onStart(e: L.PM.DrawEvent) {
      e.workingLayer.on(DrawLayerEvents.VERTEXADDED, onProgress);
      console.log('start', e)
      fireProgress(e.workingLayer);
    }

    function onProgress(e: L.PM.DrawEvent) {
      console.log('progress', e)
      fireProgress(e.workingLayer);
    }

    function onCreated(e: L.PM.DrawEvent) {
      //@ts-ignore
      map.off(DrawMapEvents.CREATE, onCreated);
      console.log('created', e)
      fireCreated(e.layer);
      subscriber.complete();
    }

    function fireProgress(layer: DrawLayer) {

      const vertexCount = layer.getLatLngs().length;

      if (type === DrawType.LINE && vertexCount >= 2) {
        console.log('FINISH line shape')
        handler._finishShape();
        return;
      }

      data$$.next({
        type,
        vertexCount,
        distance: 0,
        bbox: null,
        geohash: null,
        position: null,
        geometry: null,
      })
    }

    function fireCreated(layer: DrawLayer) {

      const data = createDrawData(layer, type);

      map.removeLayer(layer as any);

      data$$.next(data);
      data$$.complete();
      subscriber.complete();
    }

    function undo() {
      try {
        handler._removeLastVertex()
      } catch (err) { }
    }

    function completeShape() {
      try {
        handler._finishShape()
      } catch (err) { }
    }

    function reset() {
      disable();
      enable();
    }
    setTimeout(() => {
      subscriber.next({
        type,
        undo,
        completeShape,
        reset,
        data$: data$$.asObservable(),
      });
    }, 2)

    // GO GO GO
    enable();

    return () => {
      disable()
    }
  });
}

export function createDrawData(layer: DrawLayer, type: DrawType): DrawData {

  let newGeometry: DrawGeometry = null,
  vertexCount = 0,
  distance = 0,
  bbox: GeoJSON.BBox = null,
  position: GeoJSON.Position = null,
  geohash: string = null;

  if (type === DrawType.AREA) {
    vertexCount = (layer.getLatLngs() as L.LatLng[][])[0].length;
  } else {
    vertexCount = (layer.getLatLngs() as L.LatLng[]).length;
  }

  newGeometry = layer.toGeoJSON().geometry;

  if(vertexCount > 1) {
    position = layer
      .getBounds()
      .getCenter()
      .toGeoJSON().geometry.coordinates;
    bbox = layer
      .getBounds()
      .toGeoJSON();
    geohash = ngeohash.encode(position[1], position[0], 6);
    // calculate line length
    if (type === DrawType.LINE) {
      const latlngs = layer.getLatLngs() as L.LatLng[];
      distance = Number(latlngs[0].distanceTo(latlngs[1]).toFixed(2));
    }
  }

  return {
    type,
    vertexCount,
    distance,
    bbox,
    geohash,
    position,
    geometry: newGeometry
  };
}
