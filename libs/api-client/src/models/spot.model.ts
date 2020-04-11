import { LocationPathModel } from './location-path.model';
import { Geometry, Position } from '@slackmap/gis';
import { Item, ItemType, ItemSubtype, Rid } from '@slackmap/core';
import { ItemModel } from './item.model';

export class SpotModel extends ItemModel {
    rid: Rid;
    type: ItemType;
    subtype: ItemSubtype;
    user?: string;
    photo?: string;
    name?: string;
    description?: string;
    location_path?: LocationPathModel[];
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
