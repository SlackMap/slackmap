import { ClusterModel } from '../models';
import { SportType } from '@slackmap/core';
import { IsString, IsNumber, IsNumberString, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { SpotModel } from '../models/spot.model';

export const CLUSTERS_PATHS = {
  clustersGet: () => 'clusters/clusters',
  spotsGet: () => 'clusters/spots',
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
  spots: SpotModel[];
}
