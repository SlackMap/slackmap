import { ClusterModel } from '../models';
import { SportType } from '@slackmap/core';
import { IsString, IsNumber, IsNumberString, IsEnum } from "class-validator";
import { Transform } from "class-transformer";

export const CLUSTERS_PATHS = {
  clustersGet: () => 'cluster/clusters',
  spotsGet: () => 'spot/spots',
}

export class ClustersClustersGetRequestDto {
  @IsEnum(SportType)
  @Transform(value => Number(value))
  sport: SportType;
  @IsString()
  bbox: string;
  @IsNumberString()
  zoom: number;
}
export class ClustersClustersGetDto {
  clusters: ClusterModel[];
}

export class ClustersSpotsGetRequestDto {
  @IsEnum(SportType)
  @Transform(value => Number(value))
  sport: SportType;
  @IsString()
  hash: string;
}

export class ClustersSpotsGetDto {
  // spots: SpotModel[];
  spots: any[];
}
