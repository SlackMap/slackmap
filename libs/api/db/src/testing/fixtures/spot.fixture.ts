import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ItemType, ItemSubtype, RidGenerator, SportType } from '@slackmap/core';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import { now } from '../../lib/db-utils';
import { SpotEntity } from '../../lib/spot';
import * as faker from "faker";


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
  public generateFakeSpotData(): Partial<SpotEntity> {
    return {
      name: faker.name.findName(),
      lat: fakeLat(),
      lon: fakeLon(),
    };
  }

  /**
   * Used for generating existing spot for tests
   */
  private generateFakeSpot(row: Partial<SpotEntity> = {}): SpotEntity {
    const rid = this.ridGenerator.forItem(ItemType.SPOT);
    return {
      ...this.generateFakeSpotData(),
      rid,
      type: ItemType.SPOT,
      subtype: ItemSubtype.SPOT_HIGHLINE,
      sport: SportType.SLACKLINE,
      createdAt: now(),
      ...row
    };
  }

  /**
   * Createes new fake spot in database
   */
  @Transactional()
  async createFakeSpot(row?: Partial<SpotEntity>): Promise<SpotEntity> {
    const spot = this.generateFakeSpot(row);

    const statement = `CREATE (u:Spot $1) RETURN u`;

    return this.persistenceManager.getOne(
      new QuerySpecification<SpotEntity>()
        .withStatement(statement)
        .bind([spot])
        .limit(1)
        .map(r => r.u)
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
