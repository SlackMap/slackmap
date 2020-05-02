import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { OResult, OQuery } from 'orientjs';
import { OrientService } from '../orient.service';
import { User, userRow2entity, UserEntity } from './user.schema';


@Injectable()
export class UserRepository {

  selectQuery = [
    'name',
    'rid',
    'email',
    'facebook_id',
    'type',
    'subtype',
    'lastname',
    'firstname',
    'location_path',
    'imperial',
    'created_at',
    '@rid as id',
    '@version as version'
  ];
  meSelectQuery = ['imperial', 'email'];

  constructor(
    private readonly orientService: OrientService,
  ) {}

  find(where: Partial<User> | string): Promise<UserEntity[]> {
    return this.orientService.session().then(session =>
      session
      .select(this.selectQuery.join(','))
      .from(User.name)
      .where(where)
      .transform(userRow2entity)
      .all()
    );
  }

  findOne(where: Partial<User> | string): Promise<UserEntity> {
    return this.find(where).then(rows => rows[0] || null);
  }

}
