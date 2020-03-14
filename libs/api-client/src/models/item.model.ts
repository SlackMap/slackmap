import { LocationPathModel } from './location-path.model';
import { Geometry, Position } from './geojson';

export interface ItemModel {
    rid?: string;
    type?: number;
    subtype?: number;
    user?: string;
    photo?: string;
    name?: string;
    description?: string;
    location_path?: Array<LocationPathModel>;
    length?: number;
    access?: number;
    coordinates: Position;
    shape: Geometry;
    viewport?: any;
    code?: string;
    _version?: number;
    created_at?: string;
    updated_at?: string;
}
