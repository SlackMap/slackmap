import { ItemType, SpotSubtype, SportType, Poi, Item, AccessType, StatusType } from '@slackmap/core';
import { GeoJSON } from '@slackmap/gis';

export class SpotEntity implements Poi, Item {
  // item
  rid: string;
  type: ItemType.SPOT;
  subtype: SpotSubtype;
  version: number;

  // poi
  lat: number;
  lon: number;
  geohash: string;
  geometry: GeoJSON.Geometry;
  bbox: GeoJSON.BBox;

  // spot
  sport: SportType;
  name?: string;
  length?: number;
  height?: number;
  lengthLaser?: boolean;
  heightLaser?: boolean;
  access?: AccessType;
  status?: StatusType;
  climbing?: number;
  exposure?: number;
  createdAt?: string;
}
