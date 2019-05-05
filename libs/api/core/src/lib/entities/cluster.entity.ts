import { ClusterSubtype, ItemType } from '@slackmap/core';
import { Position } from '@slackmap/core';

export interface ClusterEntity {
  rid: string;
  type: number;
  subtype: number;
  coordinates: Position;
  expansion_zoom: number;
  spot_count: number;
  cluster_id: number;
  counts: ClusterCountsEntity;
}

export interface ClusterCountsEntity {
  highline?: number;
  midline?: number;
  longline?: number;
  waterline?: number;
  rodeoline?: number;
  slackline?: number;
  trickline?: number;

  area?: number;
  park?: number;
  gym?: number;
  urban?: number;
  mountain?: number;
}
