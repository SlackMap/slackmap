import { GeoJSON } from '@slackmap/gis';
import { DrawType } from '@slackmap/core';
import { Observable } from 'rxjs';
import { AllGeoJSON } from '@turf/turf';

export interface MapViewChangeData {
  bounds: [[number, number], [number, number]];
  bbox: GeoJSON.BBox;
  zoom: number;
  hashes?: string[];
}

export interface ViewOptions {
  position: GeoJSON.Position,
  zoom?: number,
}

export interface FitFeaturesOptions {
  features: AllGeoJSON,
}

export interface MapComponent {
  viewChange$: Observable<MapViewChangeData>;
  itemClick$: Observable<{item: any}>;
  fitFeatures(options: FitFeaturesOptions): void;
  setView(options: ViewOptions): void;
  spotsLayer(spots$: Observable<any>): Observable<void>;
  drawHandler(type: DrawType): Observable<DrawHandler>;
  editHandler(geometry: DrawGeometry, type?: DrawType): Observable<DrawHandler>;
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
  position: GeoJSON.Position;
  bbox: GeoJSON.BBox;
  geohash: string;
  distance: number;
  vertexCount: number;
  type: DrawType;
}

export interface DrawHandler {
  type: DrawType;
  undo: () => void,
  reset: () => void,
  completeShape: () => void,
  data$: Observable<DrawData>
}

export type DrawGeometry = GeoJSON.Point | GeoJSON.LineString | GeoJSON.Polygon;
