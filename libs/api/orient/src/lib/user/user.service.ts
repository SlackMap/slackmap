import { Injectable } from '@nestjs/common';
import { RidGenerator, ItemType, ItemSubtype } from '@slackmap/core';
import { OrientService } from '../orient.service';
import { now, toRid } from '../utils/orient-utils';
import { User, userToEntity, UserEntity } from './user.schema';


@Injectable()
export class UserService {

  constructor(
    private readonly orientService: OrientService,
    private readonly ridGenerator: RidGenerator,
  ) { }

  /**
   * create new user
   *
   * @param data
   * @returns {Promise<void>}
   */
  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const row: User = {
      rid: this.ridGenerator.forItem(ItemType.USER),
      type: ItemType.USER,
      subtype: ItemSubtype.USER_USER,
      name: data.name,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      facebook_id: data.facebookId,
      created_at: now(),
    };

    const db = await this.orientService.session();


    const user: UserEntity = await db
      .insert()
      .into(User.name)
      .set(row)
      .transform(userToEntity)
      .one();

    return user;
  }

  /**
   * update user entity
   *
   * @param rid
   * @param data
   * @returns {Promise<UserEntity>}
   */
  async update(rid: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const row: Partial<User> = {
      rid: this.ridGenerator.forItem(ItemType.USER),
      type: ItemType.USER,
      subtype: ItemSubtype.USER_USER,
      name: data.name,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      facebook_id: data.facebookId,
    };

    const db = await this.orientService.session();

    const user: UserEntity = await db
      .update(User.name)
      .set(row)
      .where({rid})
      .limit(1)
      .return('AFTER')
      .transform(userToEntity)
      .one();

    return user;
  }
}
