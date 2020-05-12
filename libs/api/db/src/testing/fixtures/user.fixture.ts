import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ItemType, ItemSubtype, RidGenerator } from '@slackmap/core';
import { UserEntity } from '../../lib/user';
import { PersistenceManager } from '@liberation-data/drivine/manager/PersistenceManager';
import { InjectPersistenceManager } from '@liberation-data/drivine/DrivineInjectionDecorators';
import { QuerySpecification } from '@liberation-data/drivine/query/QuerySpecification';
import { Transactional } from '@liberation-data/drivine/transaction/Transactional';
import { now } from '../../lib/db-utils';

@Injectable()
export class UserFixture implements OnModuleDestroy {

  private users: UserEntity[] = [];

  constructor(
    @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
    private ridGenerator: RidGenerator,
  ) { }

  static fakeFacebookId() {
    return 'test-' + Math.random().toString().split('.')[1];
  }

  static fakeEmail() {
    return Math.random().toString().split('.')[1] + '@test.slackmap.com';
  }

  static fakeName() {
    return Math.random().toString().split('.')[1];
  }

  /**
   * Used when testing creation of new user
   */
  public generateFakeUserData(): Partial<UserEntity> {
    return {
      email: UserFixture.fakeEmail(),
      name: 'Testo Maniak',
      firstName: 'Testo',
      lastName: 'Maniak',
      facebookId: UserFixture.fakeFacebookId()
    };
  }

  /**
   * Used for generating existing user for tests
   */
  private generateFakeUser(row: Partial<UserEntity> = {}): UserEntity {
    const rid = this.ridGenerator.forItem(ItemType.USER);
    return {
      rid,
      email: rid + '@test.slackmap.com',
      name: 'test-user-name',
      firstName: 'firstname',
      lastName: 'test-lastname',
      facebookId: UserFixture.fakeFacebookId(),
      type: ItemType.USER,
      subtype: ItemSubtype.USER_USER,
      createdAt: now(),
      ...row
    };
  }

  /**
   * Createes new fake user in database
   */
  @Transactional()
  async createFakeUser(row?: Partial<UserEntity>): Promise<UserEntity> {
    const data = this.generateFakeUser(row);
    const user: UserEntity = {
      rid: this.ridGenerator.forItem(ItemType.USER),
      type: ItemType.USER,
      subtype: ItemSubtype.USER_USER,
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      facebookId: data.facebookId,
      createdAt: now(),
    };

    const statement = `CREATE (u:User $1) RETURN u`;

    return this.persistenceManager.getOne(
      new QuerySpecification<UserEntity>()
        .withStatement(statement)
        .bind([user])
        .limit(1)
        .map(r => r.u)
        // .transform(UserEntity)
    );
  }

  /**
   * clear all generated data
   */
  async onModuleDestroy() {

    // with drivine we use test transaction rollback, so all test rollback after finish

    // const db = await this.orient.session();
    // for (const user of this.users) {
    //   if(!user.rid) continue;
    //   await db.batch(`DELETE VERTEX FROM User WHERE @rid = :rid`,{params:{rid: toRid(user.id)}})
    //   .one()
    //   .then(({count}) => (!count) ? console.error('NOT DELETED', count, user.rid):'')
    //   .catch((err) => console.error(err));
    // }
    // this.users = [];
  }
}
