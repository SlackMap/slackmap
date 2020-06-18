import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ItemType, ItemSubtype, RidGenerator, SportType, SpotSubtype, AccessType, StatusType } from '@slackmap/core';
import { SpotEntity, spotEntityToRow, rowToSpotEntity } from '@slackmap/api/spot/data';
import { now } from '@slackmap/api/db';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import * as faker from "faker";
import * as geohash from "ngeohash";
import { randomLineString, bbox, center, length } from "@turf/turf";
import { GeoJSON } from '@slackmap/gis';

function fakeLat() {
  return faker.random.number(90);
}
function fakeLon() {
  return faker.random.number(180);
}

@Injectable()
export class SpotFixture {

  private users: SpotEntity[] = [];

  constructor(
    @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
    private ridGenerator: RidGenerator,
  ) { }

  /**
   * Used when testing creation of new spot, this data will come from the UI form
   */
  public generateFakeSpotData(): SpotEntity {

    const geometry = randomLineString(1, {
      bbox: [-80, 30, -60, 60],
      num_vertices: 2,
    }).features[0].geometry;
    const position = center(geometry).geometry.coordinates;

    const rid = this.ridGenerator.forItem(ItemType.SPOT);

    const spot: SpotEntity = {
      name: faker.name.findName(),
      position,
      length: length(geometry, {units: "meters"}),
      height: 10,
      lengthLaser: true,
      heightLaser: false,
      access: AccessType.OPEN,
      status: StatusType.ACTIVE,
      geohash: geohash.encode(position[1], position[0]),
      version: 0,
      bbox: bbox(geometry),
      geometry,
      rid,
      type: ItemType.SPOT,
      subtype: SpotSubtype.HIGHLINE,
      sport: SportType.SLACKLINE,
      createdAt: now(),
    };

    return spot;
  }

  /**
   * Used for generating existing spot for tests
   */
  private generateFakeSpot(row: Partial<SpotEntity> = {}): SpotEntity {
    return {
      ...this.generateFakeSpotData(),
      ...row
    };
  }

  /**
   * Createes new fake spot in database
   */
  @Transactional()
  async createFakeSpot(data?: Partial<SpotEntity>): Promise<SpotEntity> {
    const spot = this.generateFakeSpot(data);
    const row = spotEntityToRow(spot);
    const statement = `CREATE (u:Spot $1) RETURN u`;

    return this.persistenceManager.getOne(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind([row])
        .limit(1)
        .map(rowToSpotEntity)
    );
  }

  async createFakeSpots(rows: Partial<SpotEntity>[]): Promise<SpotEntity[]> {
    const entities = [];
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      entities.push(await this.createFakeSpot(row));
    }
    return entities;
  }
}
