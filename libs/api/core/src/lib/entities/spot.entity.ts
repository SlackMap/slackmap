import { PoiInterface } from './interfaces/poi.interface';
import { ItemInterface } from './interfaces/item.interface';
import { Position, Geometry } from '@slackmap/core';
import { LocationPathEntity } from './location-path.entity';

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

export function spotRow2entity(row: any): SpotEntity {
  if (row) {
    if (row.id) {
      row.id = row.id.toString();
    } else if (row['@rid']) {
      row.id = row['@rid'].toString();
    }
    delete row['@type'];
    delete row['@rid'];
    delete row['@version'];
  }
  return row;
}

export function spotEntity2model<T>(entity: SpotEntity): T {
  delete entity['id'];
  return <T>entity;
}
