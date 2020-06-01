import { GeoJSON } from '@slackmap/gis';
import { LocationPathEntity } from '../location/location-path.entity';

/**
 * Base Item class
 * Others extends this
 */
export class PoiInterface {
  location_path?: LocationPathEntity;
  coordinates?: GeoJSON.Point;
  shape?: GeoJSON.Geometry;
  lat?: number;
  lon?: number;
}
