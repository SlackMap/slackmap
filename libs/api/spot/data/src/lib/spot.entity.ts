import { ItemType, SpotSubtype, SportType, AccessType, StatusType, PoiItem, SpotGeometry } from '@slackmap/core';
import { GeoJSON } from '@slackmap/gis';

export class SpotEntity implements PoiItem {
  // item
  rid: string;
  type: ItemType.SPOT;
  subtype: SpotSubtype;
  version: number;

  // poi
  position: GeoJSON.Position;
  geohash: string;
  geometry: SpotGeometry;
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
