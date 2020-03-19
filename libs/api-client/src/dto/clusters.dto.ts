import { ClusterModel } from '../models';
import { LayerType } from '@slackmap/core';
import { IsString, IsNumber, IsNumberString } from "class-validator";

export enum ClustersPaths {
  CLUSTERS = 'clusters/clusters',
  SPOTS = 'clusters/spots',
}

export class ClustersClustersGetRequestDto {
  layer: LayerType;
  @IsString()
  bbox: string;
  @IsNumberString()
  zoom: number;
}
export class ClustersClustersGetResponseDto {
  clusters: ClusterModel[];
}

export class SpotSpotsGetRequestDto {
  layer: LayerType;
  hash: string;
}

export class SpotSpotsGetResponseDto {
  clusters: ClusterModel[];
}
