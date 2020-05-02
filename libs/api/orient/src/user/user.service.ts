import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { OResult, OQuery } from 'orientjs';
import { OrientService } from '../orient.service';
import { User, userRow2entity, UserEntity } from './user.schema';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {

  constructor(
    private readonly orientService: OrientService,
    private readonly userRepository: UserRepository,
  ) { }

  find(where: Partial<User> | string): Promise<UserEntity[]> {
    return this.orientService.session().then(session =>
      session
        .select()
        .from(User.name)
        .where(where)
        .transform(userRow2entity)
        .all()
    );
  }

  findOne(where: Partial<User> | string): Promise<UserEntity> {
    return this.find(where).then(rows => rows[0] || null);
  }

  /**
   * create new user
   *
   * @param data
   * @returns {Promise<void>}
   */
  async create(data: UserEntity): Promise<UserEntity> {
    let db = await this.db.db();
    let nowDate = now();
    let newUser: UserEntity = {
      rid: itemRidGenerator(ItemType.USER),
      name: data.name,
      type: ItemType.USER,
      subtype: UserSubtype.USER,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      facebook_id: data.facebook_id,
      login_at: nowDate,
      created_at: nowDate,
    };

    let user: UserEntity = await db.query(
      'INSERT INTO User CONTENT :user RETURN @this',
      {
        params: {
          user: newUser
        }
      }
    ).then((user) => {
      if (!user.length) {
        return Promise.reject(new EidError('20170210084834', 'User not created, sorry but we don\'t know why'));
      }
      return this.get(user[0]['@rid'].toString());
    }, function (err) {
      return Promise.reject(wrap(err, '20160204090733'));
    });

    // set default location
    try {
      await this.setLocation(user.rid, ItemRids.WORLD)
    } catch (err) {
      console.error('set location error: 20170309215943', err);
    }

    // create post on user wall
    try {
      // await this.postService.upsertPostOnUser(PostSubtype.USER, user, user)
    } catch (err) {
      console.error('create user post on registration: 20170310201036', err);
    }

    return user;
  }

  /**
   * update user entity
   *
   * @param id
   * @param data
   * @returns {Promise<UserEntity>}
   */
  async update(id: string, data: UserEntity): Promise<UserEntity> {

    return this.db.query<UserEntity[]>('UPDATE User MERGE :item RETURN AFTER @this WHERE @rid=:id', {
      params: { item: data, id: toRid(id) }
    }).then((users) => {
      if (!users.length) {
        return Promise.reject(new EidError('20170210113223', 'User not updated, probably id does not exist'));
      }
      return this.get(users[0]['@rid'].toString());
    }, function (err) {
      return Promise.reject(wrap(err, '20170210113225'));
    });

  }
}
