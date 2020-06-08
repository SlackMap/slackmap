import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ItemType, ItemSubtype, RidGenerator, SportType } from '@slackmap/core';
import { SpotEntity, spotEntityToRow, rowToSpotEntity } from '@slackmap/api/spot/data';
import { now } from '@slackmap/api/db';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import * as faker from "faker";
import * as geohash from "ngeohash";


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
    const lat = fakeLat();
    const lon = fakeLon();
    const rid = this.ridGenerator.forItem(ItemType.SPOT);

    return {
      name: faker.name.findName(),
      lat,
      lon,
      geohash: geohash.encode(lat, lon),
      version: 1,
      bbox: [lat, lon, lat, lon],
      geometry: {
        "type": "LineString",
        "coordinates": [
          [
            20.848274,
            52.33492
          ],
          [
            20.858917,
            52.329045
          ]
        ]
      },
      rid,
      type: ItemType.SPOT,
      subtype: ItemSubtype.SPOT_HIGHLINE,
      sport: SportType.SLACKLINE,
      createdAt: now(),
    };
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
