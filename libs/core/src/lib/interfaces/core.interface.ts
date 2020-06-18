import { ItemType, ItemSubtypes } from '../item-type';
import { GeoJSON } from '@slackmap/gis';

export const MAP_ZOOM_THRESHOLD = 16;

export type SpotGeometry = GeoJSON.LineString | GeoJSON.Polygon | GeoJSON.Point;

export interface Item {
  rid: string;
  type: ItemType;
  subtype: ItemSubtypes;
  version: number;
}

/**
 * Implement this interface if your entity want's to be indexed as map POI
 */
export interface Poi<G = SpotGeometry> {
  position: GeoJSON.Position;
  geometry: G;
  geohash: string;
  bbox: GeoJSON.BBox;
}

export type PoiItem<G = SpotGeometry> = Poi<G> & Item;
