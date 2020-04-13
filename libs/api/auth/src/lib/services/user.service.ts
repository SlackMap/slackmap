import { Injectable } from '@nestjs/common';
import { OrientService, UserEntity, userRow2entity } from '@slackmap/api/orient';
import { FbProfile, FbUser } from '@slackmap/api/facebook-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class UserService {

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
    '@version as _version'
  ];
  meSelectQuery = ['imperial', 'email'];

  constructor(
    private readonly db: OrientService,
  ) { }

  /**
   * find user in database by facebook id or email
   * should be only one, but can happen more
   */
  findByFacebookProfile(fbUser: FbUser): Observable<UserEntity[]> {
    let where = '';
    const params: any = {};
    if (fbUser.id) {
      where = 'facebook_id = :facebook_id';
      params.facebook_id = fbUser.id;
    }
    if (fbUser.email) {
      where = where + ' OR email = :email';
      params.email = fbUser.email;
    }
    const query = `
    SELECT ${this.selectQuery.join(',')}
    FROM User
    where ${where}
    `;
    return this.db.queryAll<any>(query, { params }).pipe(
      map(users => users.map(userRow2entity))
    );
  }
}
