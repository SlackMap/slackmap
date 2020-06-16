import { Injectable } from '@nestjs/common';
import { RidGenerator, ItemType, ItemSubtype, SportType } from '@slackmap/core';
import { now, createWhere, WhereOperator } from '@slackmap/api/db';
import { SpotEntity } from './spot.entity';
import * as geohash from 'ngeohash';
import { GeoJSON } from '@slackmap/gis';
import { PersistenceManager, QuerySpecification, Transactional, InjectPersistenceManager, CursorSpecification } from '@liberation-data/drivine';

export function spotEntityToRow(spot: Partial<SpotEntity>): any {
  const row: any = {
    ...spot
  };
  if (spot.geometry) {
    row.geometry = JSON.stringify(spot.geometry);
  }
  return row;
}

export function rowToSpotEntity(row: any): SpotEntity {
  if (row.geometry) {
    row.geometry = JSON.parse(row.geometry);
  }
  return row;
}

@Injectable()
export class SpotRepository {
  constructor(
    @InjectPersistenceManager()
    private persistenceManager: PersistenceManager,
  ) { }

  @Transactional()
  async findOne(spot: Partial<SpotEntity>, operator: WhereOperator = WhereOperator.AND): Promise<SpotEntity | null> {
    const { where, params } = createWhere(spotEntityToRow(spot), operator);
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
        .map(rowToSpotEntity)
    ).then(rows => rows[0] ? rows[0] : null);
  }

  @Transactional()
  async find(spot: Partial<SpotEntity>, operator: WhereOperator = WhereOperator.AND): Promise<SpotEntity[]> {
    const { where, params } = createWhere(spotEntityToRow(spot), operator);
    const statement = `
            MATCH (u:Spot)
            WHERE ${where}
            RETURN u
        `;
    return this.persistenceManager.query(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind(params)
        .map(rowToSpotEntity)
    );
  }

  @Transactional()
  async create(spot: Partial<SpotEntity>): Promise<SpotEntity> {
    const row = spotEntityToRow(spot);
    row.version = 1;
    const statement = `
            CREATE (u:Spot $1)
            RETURN u {.*}
        `;
    return this.persistenceManager.getOne(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind([row])
        .limit(1)
        .map(rowToSpotEntity)
    );

  }

  @Transactional()
  async update(rid: string, spot: Partial<SpotEntity>): Promise<SpotEntity> {
    const row = spotEntityToRow(spot);
    delete row.version;

    const statement = `
            MATCH (u:Spot {rid: $1})
            SET u += $2
            SET u.version = u.version+1
            RETURN u
        `;
    return this.persistenceManager.getOne(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind([rid, row])
        .limit(1)
        .map(rowToSpotEntity)
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
        .map(rowToSpotEntity)
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
    ];
    console.log('sport', sport, typeof sport)
    const statement = `
        MATCH (u:Spot)
        // WHERE u.sport = 1
        RETURN u {.rid, .lat, .lon, .subtype}
    `;
    return this.persistenceManager.query(
      new CursorSpecification<SpotEntity>()
        .withStatement(statement)
        .bind(params)
      // .map(rowToSpotEntity)
    );
  }
}
