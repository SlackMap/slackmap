import {ItemInterface} from './interfaces/item.interface';

export class UserEntity implements ItemInterface {
  // item
  id?: string;
  rid?: string;
  type?: number;
  subtype?: number;
  user?: string;
  photo?: string;
  name?: string;
  description?: string;
  privacy?: number;
  _version?: number;
  created_at?: string;
  updated_at?: string;

  // user
  location_path?: any[];
  facebook_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  login_at?: string;
}

export function userRow2entity(row: any): UserEntity {
  if (row) {
    delete row['@type'];
    delete row['@rid'];
    delete row['@version'];
    if (row['firstname']) {
      row.first_name = row['firstname'];
      delete row['firstname'];
    }
    if (row['lastname']) {
      row.last_name = row['lastname'];
      delete row['lastname'];
    }
    row.id = row.id.toString();
  }
  return row;
}
export function userEntity2row(row: any): any {
  if (row) {
    delete row['@type'];
    delete row['@rid'];
    delete row['@version'];
    if (row['first_name']) {
      row.firstname = row['first_name'];
      delete row['first_name'];
    }
    if (row['last_name']) {
      row.lastname = row['last_name'];
      delete row['last_name'];
    }
  }
  return row;
}

export function userEntity2model<T>(entity: UserEntity): T {
  delete entity['id'];
  delete entity['email'];
  delete entity['lastname'];
  delete entity['firstname'];
  return <T>entity;
}
