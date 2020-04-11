import {BBox} from '@slackmap/gis';
import { Observable } from 'rxjs';

export interface MapViewChangeData {
  bounds: [[number, number], [number, number]];
  bbox: BBox;
  zoom: number;
  hashes?: string[];
}

export interface MapComponent {
  viewChange$: Observable<MapViewChangeData>;
  itemClick$: Observable<{item: any}>;
  spotsLayer(spots$: Observable<any>): Observable<void>;
  drawHandler(type: DrawType, shape?: DrawShape): Observable<DrawHandler>;
}

/**
 * Draw Handler drawing shapes types
 */
export enum DrawType {
  LINE = 'LINE',
  AREA = 'AREA'
}

/**
 * draw handler will emit this data
 */
export interface DrawData {
  shape: DrawShape;
  coordinates: any;
  distance: number;
  vertexCount: number;
  type: DrawType;
}

export interface DrawHandler {
  undo: () => void,
  reset: () => void,
  completeShape: () => void,
  data$: Observable<DrawData>
}

export type DrawShape = any;
