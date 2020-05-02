import * as RecordId from 'orientjs/lib/recordid';
import { ORID } from 'orientjs';

/**
 * Convert ORID string to RecordId object so you can use it in the database queries
 */
export function toRid(rid: string): ORID {
  return RecordId.parse(rid)
}

/**
 * Returns current date in the format for inserting in OrientDB database
 */
export function now(): string {
  return (new Date()).toJSON()
}
