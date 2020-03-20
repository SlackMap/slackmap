import { ClusterModel } from '../models';
import { LayerType } from '@slackmap/core';
import { IsString, IsNumber, IsNumberString, IsEnum } from "class-validator";

export const CLUSTERS_PATHS = {
  clustersGet: () => 'clusters/clusters',
  spotsGet: () => 'clusters/spots',
}

export class ClustersClustersGetRequestDto {
  @IsEnum(LayerType)
  layer: LayerType;
  @IsString()
  bbox: string;
  @IsNumberString()
  zoom: number;
}
export class ClustersClustersGetDto {
  clusters: ClusterModel[];
}

export class SpotSpotsGetRequestDto {
  @IsEnum(LayerType)
  layer: LayerType;
  @IsString()
  hash: string;
}

export class SpotSpotsGetDto {
  spots: any[];
}
