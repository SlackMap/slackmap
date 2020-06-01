import { Injectable } from '@nestjs/common';
import { RidGenerator, ItemType, ItemSubtype, SportType } from '@slackmap/core';
import { now, createWhere, WhereOperator } from '../db-utils';
import { SpotEntity } from './spot.entity';
import * as geohash from 'ngeohash';
import { GeoJSON } from '@slackmap/gis';

import { PersistenceManager, QuerySpecification, Transactional, InjectPersistenceManager, CursorSpecification } from '@liberation-data/drivine';

@Injectable()
export class SpotRepository {
  constructor(
    @InjectPersistenceManager()
    private persistenceManager: PersistenceManager,
    private ridGenerator: RidGenerator,
  ) { }

  @Transactional()
  async findOne(user: Partial<SpotEntity>, operator: WhereOperator = WhereOperator.AND): Promise<SpotEntity | null> {
    const { where, params } = createWhere(user, operator);
    const statement = `
            MATCH (u:Spot)
            WHERE ${where}
            RETURN u
        `;
    return this.persistenceManager.query(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind(params)
        .limit(1)
        .map(r => r.u)
    ).then(rows => rows[0] ? rows[0] : null);
  }

  @Transactional()
  async find(user: Partial<SpotEntity>, operator: WhereOperator = WhereOperator.AND): Promise<SpotEntity[]> {
    const { where, params } = createWhere(user, operator);
    const statement = `
            MATCH (u:Spot)
            WHERE ${where}
            RETURN u
        `;
    return this.persistenceManager.query(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind(params)
        .map(r => r.u)
    );
  }

  @Transactional()
  async create(data: Partial<SpotEntity>): Promise<SpotEntity> {
    const user: SpotEntity = {
      rid: this.ridGenerator.forItem(ItemType.SPOT),
      type: ItemType.SPOT,
      subtype: data.subtype,
      sport: data.sport,
      name: data.name,
      lat: data.lat,
      lon: data.lon,
      createdAt: now(),
    };
    const statement = `
            CREATE (u:Spot $1)
            RETURN u {.*}
        `;
    return this.persistenceManager.getOne(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind([user])
        .limit(1)
        .map(r => r.u)
    );

  }

  @Transactional()
  async update(rid: string, data: Partial<SpotEntity>): Promise<SpotEntity> {
    const user: Partial<SpotEntity> = {
      subtype: data.subtype,
      name: data.name,
      lat: data.lat,
      lon: data.lon,
    };

    const statement = `
            MATCH (u:Spot {rid: $1})
            SET u += $2
            RETURN u
        `;
    return this.persistenceManager.getOne(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind([rid, user])
        .limit(1)
        .map(r => r.u)
    );
  }

  /**
   * @param bbox [minlat, minlon, maxlat, maxlon]
   */
  @Transactional()
  findByBBox(bbox: GeoJSON.BBox, sport: SportType): Promise<SpotEntity[]> {
    const params = [
      bbox[0], //minlat
      bbox[2], //maxlat
      bbox[1], //minlon
      bbox[3], //maxlon
      sport
    ]
    const statement = `
        MATCH (u:Spot)
        WHERE $1 <= u.lat <= $2 AND $3 <= u.lon <= $4 AND u.sport = $5
        RETURN u
    `;
    return this.persistenceManager.query(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind(params)
        .map(r => r.u)
    );
  }

  @Transactional()
  getByGeohash(hash: string, sport: SportType): Promise<SpotEntity[]> {
    const bbox = geohash.decode_bbox(hash);
    return this.findByBBox(bbox, sport);
  }

  @Transactional()
  getForClustering(sport: SportType): Promise<SpotEntity[]> {
    const params = [
      sport
    ]
    const statement = `
        MATCH (u:Spot)
        WHERE u.sport = $1
        RETURN u {.rid, .lat, .lon, .subtype}
    `;
    return this.persistenceManager.query(
      new CursorSpecification<SpotEntity>()
        .withStatement(statement)
        .bind(params)
        .map(r => r.u)
    );
  }
}
