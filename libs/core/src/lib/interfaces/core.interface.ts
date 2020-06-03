import { ItemType, ItemSubtype } from '../item-type';
import { GeoJSON } from '@slackmap/gis';

export const MAP_ZOOM_THRESHOLD = 16;

export interface Item {
  rid: string;
  type: ItemType;
  subtype: ItemSubtype;
}

/**
 * Implement this interface if your entity want's to be indexed as map POI
 */
export interface Poi {
  center: GeoJSON.Point;
  lat: number;
  lon: number;
  geometry: GeoJSON.Geometry;
  bbox: GeoJSON.BBox;
}

export type PoiItem = Poi & Item;
