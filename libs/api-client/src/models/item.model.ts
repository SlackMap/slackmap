import { LocationPathModel } from './location-path.model';
import { GeoJSON } from '@slackmap/gis';
import { Item, ItemType, ItemSubtype, Rid } from '@slackmap/core';

export class ItemModel implements Item {
    rid: Rid;
    type: ItemType;
    subtype: ItemSubtype;
    user?: string;
    photo?: string;
    name?: string;
    description?: string;
    location_path?: Array<LocationPathModel>;
    length?: number;
    access?: number;
    coordinates: GeoJSON.Point;
    shape: GeoJSON.Geometry;
    viewport?: any;
    code?: string;
    _version?: number;
    created_at?: string;
    updated_at?: string;
}
