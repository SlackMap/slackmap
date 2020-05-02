import { ItemInterface } from '../item';
import { UserSubtype, ItemType } from '@slackmap/core';
import { ORow } from 'orientjs';

/**
 * This represents the User class inside OrientDB schema
 *
 * Use this for inserting new records into database
 */
export class User {
  rid: string;
  name: string;
  type: ItemType.USER;
  subtype: UserSubtype;
  firstname: string;
  lastname: string;
  email: string;
  facebook_id: string;
  created_at: string;
}

/**
 * This represents the domain object of User class
 */
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
  version?: number;
  createdAt?: string;
  updatedAt?: string;

  // user
  locationPath?: any[];
  facebookId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  loginAt?: string;
}

/**
 * Use this to map selected User class to UserEntity
 */
export function userToEntity(row: User & ORow): UserEntity {

  return {
    id: (row['@rid'] || '').toString(),
    version: row['@version'],
    rid: row.rid,
    type: row.type,
    email: row.email,
    subtype: row.subtype,
    name: row.name,
    lastName: row.lastname,
    firstName: row.firstname,
    facebookId: row.facebook_id,
  };
}
