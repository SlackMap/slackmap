
import { GeoJSON } from '@slackmap/gis';
import { ClusterSubtype, ItemType, Rid, ItemSubtype } from '@slackmap/core';

export type ClusterCountsModel = {
  [key in ItemSubtype]?: number;
}

export interface ClusterModel {
    rid: Rid;
    type: ItemType.CLUSTER;
    subtype: ClusterSubtype;
    coordinates: GeoJSON.Point;
    expansion_zoom: number;
    spot_count: number;
    cluster_id: number;
    counts: ClusterCountsModel;
}

