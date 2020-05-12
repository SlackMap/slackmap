import { Position, Geometry } from '@slackmap/gis';
import { LocationPathEntity } from '../location/location-path.entity';

/**
 * Base Item class
 * Others extends this
 */
export interface PoiInterface {
  location_path?: LocationPathEntity;
  coordinates?: Position;
  shape?: Geometry;
  lat?: number;
  lon?: number;
}
