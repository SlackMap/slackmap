
import { GeoJSON } from '@slackmap/gis';
import { ClusterSubtype, ItemType, Rid, ItemSubtypes } from '@slackmap/core';

export type ClusterCountsModel = {
  [key in ItemSubtypes]?: number;
}

export interface ClusterModel {
    rid: Rid;
    type: ItemType.CLUSTER;
    subtype: ClusterSubtype;
    position: GeoJSON.Position;
    expansionZoom: number;
    spotCount: number;
    clusterId: number;
    counts: ClusterCountsModel;
}

