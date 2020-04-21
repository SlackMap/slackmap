import {Injectable} from '@nestjs/common';
import {ItemType, ItemSubtype, RidGenerator} from '@slackmap/core';
import { UserEntity, OrientService, now } from '@slackmap/api/orient';
import { JwtPayloadModel } from '../../lib/models';
import { AuthService } from '../../lib/services';

export interface UserSessionMockData {
  apiToken: string;
  payload: JwtPayloadModel;
  user: UserEntity;
}

@Injectable()
export class UserFixture {
  private users: UserEntity[] = [];
  private tokens: string[] = [];
  private ridGenerator = new RidGenerator();
  constructor(
    public orient: OrientService,
    private userService: AuthService,
  ) {}

  /**
   * Used when testing creation of new user
   */
  public generateUserData(): UserEntity {
    return {
      email: this.ridGenerator.fakeEmail(),
      name: 'Testo Maniak',
      first_name: 'Testo',
      last_name: 'Maniak',
      facebook_id: this.ridGenerator.fakeFacebookId()
    };
  }
  /**
   * Used for generating existing user for tests
   */
  private generateUserRow(data = {}): UserEntity {
    const rid = this.ridGenerator.forItem(ItemType.USER);
    return {
      rid,
      email: rid + '@test.slackmap.com',
      name: 'test-user-name',
      first_name: 'firstname',
      last_name: 'test-lastname',
      facebook_id: 'fb-' + rid,
      type: ItemType.USER,
      subtype: ItemSubtype.USER_USER,
      created_at: now(),
      login_at: now()
    };
  }

  async generateUser(data?: UserEntity): Promise<UserEntity> {
    if (!data) {
      data = this.generateUserRow();
    }

    // await this.orient.query(`DELETE VERTEX FROM User WHERE email = '${data.email}'`);

    return this.orient
      .query<any>('INSERT INTO User CONTENT :user RETURN @this', {
        params: {
          user: data
        }
      })
      .toPromise()
      .then(([user]) => {
        user.id = user['@rid'].toString();
        delete user['@class'];
        delete user['@rid'];
        delete user['@version'];
        delete user['@type'];
        this.users.push(user);
        return user;
      });
  }

  async generateUserSession(user?: UserEntity): Promise<UserSessionMockData> {
    if (!user) {
      user = await this.generateUser();
    }
    const payload: JwtPayloadModel = {
      user,
      users: [user]
    };
    const api_token = this.userService.sign(payload);
    this.tokens.push(api_token);
    return {
      apiToken: api_token,
      payload,
      user
    };
  }

  /**
   * clear all generated data
   */
  async destroy() {
    for (const user of this.users) {
      const removed = await this.orient.query(`DELETE VERTEX FROM User WHERE @rid = ${user.id}`).toPromise().then(row => row[0]);
    }
    this.users = [];
    this.tokens = [];
  }

  /**
   * check if all generated data is clean
   * challed by OnModuleDestroy hook
   * and it has to be sync
   */
  isDestroyed() {
    return !this.users.length && !this.tokens.length;
  }
}
