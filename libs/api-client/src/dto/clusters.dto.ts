import { ClusterModel } from '../models';
import { SportType } from '@slackmap/core';
import { IsString, IsNumber, IsNumberString, IsEnum } from "class-validator";

export const CLUSTERS_PATHS = {
  clustersGet: () => 'clusters/clusters',
  spotsGet: () => 'clusters/spots',
}

export class ClustersClustersGetRequestDto {
  @IsEnum(SportType)
  layer: SportType;
  @IsString()
  bbox: string;
  @IsNumberString()
  zoom: number;
}
export class ClustersClustersGetDto {
  clusters: ClusterModel[];
}

export class SpotSpotsGetRequestDto {
  @IsEnum(SportType)
  layer: SportType;
  @IsString()
  hash: string;
}

export class SpotSpotsGetDto {
  spots: any[];
}
