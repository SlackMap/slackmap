import { OResult, ODatabaseSession, QueryOptions, LiveQuery } from "orientjs";
import { Observable } from 'rxjs';
import { reduce, take } from 'rxjs/operators';
const db = require('orientjs/lib/client/database/database');

export interface OrientRow {
  '@rid': { cluster: number, position: number },
  '@class': string,
  '@version': number
}
export enum LiveQueryOperation {
  INSERT = 1,
  UPDATE = 2,
  DELETE = 3,
}
export interface LiveQueryEvent<R> {
  monitorId: number,
  operation: LiveQueryOperation,
  data: R
  before?: R
}

declare module "orientjs" {
  export interface ODatabaseSession {
    query$: <R>(query: string, options?: QueryOptions) => Observable<R>;
    queryOne$: <R>(query: string, options?: QueryOptions) => Observable<R>;
    queryAll$: <R>(query: string, options?: QueryOptions) => Observable<R[]>;
    liveQuery$: <R>(query: string, options?: QueryOptions) => Observable<LiveQueryEvent<R>>;
    command$: <R>(command: string, options?: QueryOptions) => Observable<R>;
  }
}

db.prototype.query$ = function (query, options) {
  return new Observable(subscriber => {

    const stream: OResult<any> = this.query(query, options);

    stream
      .on("data", (data: any) => subscriber.next(data))
      .on('error', (err) => subscriber.error(err))
      .on("end", () => subscriber.complete());

    return () => stream.close()
  });
}

db.prototype.queryAll$ = function (query, options) {
  return this.query$(query, options).pipe(
    reduce((acc, v) => {
      acc.push(v);
      return acc as any;
    }, [])
  );
}

db.prototype.queryOne$ = function (query, options) {
  return this.query$(query, options).pipe(
    take(1)
  );
}

db.prototype.liveQuery$ = function (query, options) {
  return new Observable(subscriber => {

    const stream: LiveQuery = this.liveQuery(query, options);

    stream
      .on("data", (data: any) => subscriber.next(data))
      .on('error', (err) => subscriber.error(err))
      .on("end", () => subscriber.complete());

    return () => stream.unsubscribe()
  });
}

db.prototype.command$ = function (query, options) {
  return new Observable(subscriber => {

    const stream: OResult<any> = this.command(query, options);

    stream
      .on("data", (data: any) => subscriber.next(data))
      .on('error', (err) => subscriber.error(err))
      .on("end", () => subscriber.complete());

    return () => stream.close()
  });
}
