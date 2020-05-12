import { PoiInterface } from '../item/poi.interface';
import { ItemInterface } from '../item/item.interface';
import { Position, Geometry } from '@slackmap/gis';
import { LocationPathEntity } from '../location/location-path.entity';

export class SpotEntity implements ItemInterface {
  // // item
  id?: string;
  rid?: string;
  type?: number;
  subtype?: number;
  user?: string;
  photo?: string;
  name?: string;
  description?: string;
  privacy?: number;
  _version?: number;
  created_at?: string;
  updated_at?: string;

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
  length_laser?: boolean;
  height_laser?: boolean;
}
