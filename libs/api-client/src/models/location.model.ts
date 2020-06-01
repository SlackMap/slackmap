import { LocationPathModel } from './location-path.model';
import {ViewportModel} from './viewport.model';
import { GeoJSON } from '@slackmap/gis';

export class LocationModel {
    id?: string;
    rid?: string;
    type?: number;
    subtype?: number;
    photo_rid?: string;
    name?: string;
    description?: string;
    location_path?: LocationPathModel;
    privacy?: number;
    coordinates?: GeoJSON.Point;
    lat?: number;
    lon?: number;
    shape?: GeoJSON.Geometry;
    viewport?: ViewportModel;
    code?: string;

    _version?: number;
    created_at?: string;
    updated_at?: string;
}
