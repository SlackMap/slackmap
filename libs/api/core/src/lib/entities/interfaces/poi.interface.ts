import { GeoCoordinates, GeoShape } from '@slackmap/core';
import { LocationPathEntity } from '../location-path.entity';

/**
 * Base Item class
 * Others extends this
 */
export interface PoiInterface {
  location_path?: LocationPathEntity;
  coordinates?: GeoCoordinates;
  shape?: GeoShape;
  lat?: number;
  lon?: number;
}
