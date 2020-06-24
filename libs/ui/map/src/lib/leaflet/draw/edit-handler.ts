import * as L from "leaflet";
import "./draw-customs";
import { DrawType, DrawHandler, DrawGeometry, DrawData } from "../../+map";
import { Observable, Subject } from 'rxjs';
import { GeoJSON } from '@slackmap/gis';
import * as ngeohash from 'ngeohash';
import { createDrawData } from './draw-handler';

/**
  * handler for drawing or editing shapes on map
  *
  * @param {*} map L.Map
  * @param {*} type DrawType
  * @param {*} geometry supported geojson Geometry to edit
  */
export function editHandler(map: L.Map, geometry: DrawGeometry, type: DrawType): Observable<DrawHandler> {
  return new Observable<DrawHandler>(subscriber => {
    if(!map) {
      return subscriber.error(new Error('drawHandler(map, type, geometry) requires L.Map to be provided'));
    }
    if(!type) {
      return subscriber.error(new Error('drawHandler(map, type, geometry) requires DrawType to be provided'));
    }

    const data$$ = new Subject<DrawData>();

    let layer: L.Layer;

    // GO GO GO
    start();

    /**
     * start the process of draw/edit
     */
    function start() {
      layer = L.GeoJSON.geometryToLayer({type: 'Feature', geometry, properties: {}});
      console.log('EDIT START', layer)
      if(layer) {
        map.addLayer(layer);
        //@ts-ignore
        layer.pm.enable();
        layer.on('pm:edit', onEdit);
      }
    }

    /**
     * clean and stop drawing/editing
     */
    function stop() {
      console.log('stop')
      if (layer) {
        map.removeLayer(layer);
        layer = null;
        layer.off('pm:edit', onEdit);
      }
    }

    /**
     * onCreated - handle dreation of new shape
     */
    function onEdit(e) {
      console.log('edit', e)
      data$$.next(createDrawData(e.target, type));
    }


    function undo() {}

    function completeShape() {}

    function reset() {}

    subscriber.next({
      type,
      undo,
      completeShape,
      reset,
      data$: data$$.asObservable(),
    });

    return () => {
      stop();
    }
  });
}
