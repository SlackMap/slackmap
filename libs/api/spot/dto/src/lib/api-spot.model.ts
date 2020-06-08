import { ItemType, SpotSubtype, SportType, Poi, Item, AccessType, StatusType } from '@slackmap/core';
import { GeoJSON } from '@slackmap/gis';

export class SpotModel {
  // item
  rid: string;
  type: ItemType.SPOT;
  subtype: SpotSubtype;

  // poi
  lat: number;
  lon: number;
  geometry: GeoJSON.Geometry;
  bbox: GeoJSON.BBox;
  geohash: string;

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
