import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { OResult, OQuery } from 'orientjs';
import { OrientService } from '../orient.service';
import { User, userToEntity, UserEntity } from './user.schema';


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
  ];

  constructor(
    private readonly orientService: OrientService,
  ) {}

  find(where: Partial<User> | string): Promise<UserEntity[]> {
    return this.orientService.session().then(session =>
      session
      .select()
      .from(User.name)
      .where(where)
      .transform(userToEntity)
      .all()
    );
  }

  findOne(where: Partial<User> | string): Promise<UserEntity> {
    return this.find(where).then(rows => rows[0] || null);
  }

}
