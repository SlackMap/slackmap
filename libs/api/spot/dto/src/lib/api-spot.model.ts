import { ItemType, SportType, Poi, Item, AccessType, StatusType, ItemSubtype, SpotSubtype, SpotGeometry, PoiItem } from '@slackmap/core';
import { GeoJSON } from '@slackmap/gis';
import { IsString, IsEnum, Equals, IsNumber, IsBoolean, IsDefined, IsOptional } from 'class-validator';

export class SpotModel<G = SpotGeometry> implements PoiItem<G> {
  // item
  @IsString()
  rid: string;

  @IsNumber()
  version: number;

  @Equals(ItemType.SPOT)
  type: ItemType.SPOT;

  @IsEnum(SpotSubtype)
  subtype: SpotSubtype;

  // poi
  @IsNumber({}, {each: true})
  position: GeoJSON.Position;

  @IsDefined()
  geometry: G;

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
