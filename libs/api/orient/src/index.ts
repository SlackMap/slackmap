export * from './orient.config';
export * from './orient.module';
export * from './orient.service';
import * as RecordId from 'orientjs/lib/recordid';

export function toRid(rid: string) {
  return RecordId.parse(rid)
}

export function now(): string {
  return (new Date()).toJSON()
}
