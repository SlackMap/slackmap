import { ItemType, SportType, Poi, Item, AccessType, StatusType, ItemSubtype, SpotSubtype } from '@slackmap/core';
import { GeoJSON } from '@slackmap/gis';
import { IsString, IsEnum, Equals, IsNumber, IsBoolean, IsDefined, IsOptional } from 'class-validator';

export class SpotModel {
  // item
  @IsString()
  rid: string;

  @Equals(ItemType.SPOT)
  type: ItemType.SPOT;

  @IsEnum(SpotSubtype)
  subtype: SpotSubtype;

  // poi
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsDefined()
  geometry: GeoJSON.Geometry;

  @IsNumber({}, {each: true})
  bbox: GeoJSON.BBox;

  @IsString()
  geohash: string;

  // spot
  @IsEnum(SportType)
  sport: SportType;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  length?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsBoolean()
  @IsOptional()
  lengthLaser?: boolean;

  @IsBoolean()
  @IsOptional()
  heightLaser?: boolean;

  @IsEnum(AccessType)
  access?: AccessType;

  @IsEnum(StatusType)
  status?: StatusType;

  climbing?: number;
  exposure?: number;

  @IsString()
  @IsOptional()
  createdAt?: string;
}
