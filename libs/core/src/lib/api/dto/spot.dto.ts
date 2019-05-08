import { ClusterModel } from '../models';
import { LayerType } from '@slackmap/core';

export enum SpotsPaths {
  CLUSTERS = 'spots/clusters',
  SPOTS = 'spots/spots',
}

export class SpotClustersGetRequestDto {
  layer: LayerType;
  bbox: string;
  zoom: number;
}
export class SpotClustersGetResponseDto {
  clusters: ClusterModel[];
}

export class SpotSpotsGetRequestDto {
  layer: LayerType;
  hash: string;
}

export class SpotSpotsGetResponseDto {
  clusters: ClusterModel[];
}
