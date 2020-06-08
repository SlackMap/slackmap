import { GeoJSON } from '@slackmap/gis';
import { DrawType } from '@slackmap/core';
import { Observable } from 'rxjs';

export interface MapViewChangeData {
  bounds: [[number, number], [number, number]];
  bbox: GeoJSON.BBox;
  zoom: number;
  hashes?: string[];
}

export interface MapComponent {
  viewChange$: Observable<MapViewChangeData>;
  itemClick$: Observable<{item: any}>;
  spotsLayer(spots$: Observable<any>): Observable<void>;
  drawHandler(type: DrawType, geometry?: DrawGeometry): Observable<DrawHandler>;
}

/**
 * Draw Handler drawing shapes types
 */
export {DrawType}

/**
 * draw handler will emit this data
 */
export interface DrawData {
  geometry: DrawGeometry;
  center: GeoJSON.Point;
  bbox: GeoJSON.BBox;
  distance: number;
  vertexCount: number;
  type: DrawType;
}

export interface DrawHandler {
  type: DrawType;
  undo: () => void,
  reset: () => void,
  completeShape: () => void,
  data: DrawData
}

export type DrawGeometry = GeoJSON.Point | GeoJSON.LineString | GeoJSON.Polygon;
