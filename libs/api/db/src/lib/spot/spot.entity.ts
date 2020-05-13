import { Position, Geometry } from '@slackmap/gis';
import { LocationPathEntity } from '../location/location-path.entity';
import { ItemType, SpotSubtype, SportType } from '@slackmap/core';

export class SpotEntity {
  // item
  rid?: string;
  type?: ItemType;
  subtype?: SpotSubtype;
  sport?: SportType;
  name?: string;
  description?: string;
  createdAt?: string;

  // poi
  location_path?: LocationPathEntity;
  coordinates?: Position;
  shape?: Geometry;
  lat?: number;
  lon?: number;

  // spot
  length?: number;
  height?: number;
  access?: number;
  climbing?: number;
  exposure?: number;
  lengthLaser?: boolean;
  heightLaser?: boolean;
}
