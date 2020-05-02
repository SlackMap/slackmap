import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ItemType, ItemSubtype, RidGenerator } from '@slackmap/core';
import { User, userToEntity, toRid, UserEntity, OrientService, now } from '../../lib';

@Injectable()
export class UserFixture implements OnModuleDestroy {

  private users: UserEntity[] = [];

  constructor(
    private orient: OrientService,
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
  private generateFakeUser(): User {
    const rid = this.ridGenerator.forItem(ItemType.USER);
    return {
      rid,
      email: rid + '@test.slackmap.com',
      name: 'test-user-name',
      firstname: 'firstname',
      lastname: 'test-lastname',
      facebook_id: UserFixture.fakeFacebookId(),
      type: ItemType.USER,
      subtype: ItemSubtype.USER_USER,
      created_at: now(),
    };
  }

  /**
   * Createes new fake user in database
   */
  async createFakeUser(): Promise<UserEntity> {
    const row = this.generateFakeUser();
    const db = await this.orient.session();
    const user: UserEntity = await db
      .insert()
      .into(User.name)
      .set(row)
      .transform(userToEntity)
      .one();
    this.users.push(user);
    return user;
  }

  /**
   * clear all generated data
   */
  async onModuleDestroy() {
    const db = await this.orient.session();
    for (const user of this.users) {
      if(!user.rid) continue;
      await db.batch(`DELETE VERTEX FROM User WHERE @rid = :rid`,{params:{rid: toRid(user.id)}})
      .one()
      .then(({count}) => (!count) ? console.error('NOT DELETED', count, user.rid):'')
      .catch((err) => console.error(err));
    }
    this.users = [];
  }
}
