import { ItemType, SpotSubtype, SportType, Poi, Item } from '@slackmap/core';
import { GeoJSON } from '@slackmap/gis';

export class SpotEntity implements Poi, Item {
  // item
  rid: string;
  type: ItemType.SPOT;
  subtype: SpotSubtype;

  // poi
  center: GeoJSON.Point;
  lat: number;
  lon: number;
  geometry: GeoJSON.Geometry;
  bbox: GeoJSON.BBox;

  // spot
  sport: SportType;
  name?: string;
  length?: number;
  height?: number;
  lengthLaser?: boolean;
  heightLaser?: boolean;
  access?: number;
  climbing?: number;
  exposure?: number;
  createdAt?: string;
}
