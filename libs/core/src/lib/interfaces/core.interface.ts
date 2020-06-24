import { ItemType, ItemSubtypes } from '../item-type';
import { GeoJSON } from '@slackmap/gis';
import { AccessType } from '../spot-access';
import { StatusType } from '../spot-status';

export const MAP_ZOOM_THRESHOLD = 16;

export type SpotGeometry = GeoJSON.LineString | GeoJSON.Polygon | GeoJSON.Point;

export interface Item {
  rid: string;
  type: ItemType;
  subtype: ItemSubtypes;
  version: number;
}
export interface Spot {
  name: string;
  access: AccessType;
  status: StatusType;
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

export type SpotItem<G = SpotGeometry> = PoiItem<G> & Spot;
