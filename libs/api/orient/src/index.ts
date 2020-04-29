export * from './entities';
export * from './orient.config';
export * from './orient.module';
export * from './orient.service';
export * from './close.interceptor';
export * from './operators/acquire.operator';
import * as RecordId from 'orientjs/lib/recordid';

export function toRid(rid: string) {
  return RecordId.parse(rid)
}

export function now(): string {
  return (new Date()).toJSON()
}
