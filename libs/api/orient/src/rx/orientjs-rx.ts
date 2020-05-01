import { OResult, ODatabaseSession, QueryOptions, LiveQuery, OQuery, ORID } from "orientjs";
import { Observable } from 'rxjs';
import { reduce, take, map } from 'rxjs/operators';
const DatabaseSession = require('orientjs/lib/client/database/database');
const Result = require('orientjs/lib/client/database/result');
const Query = require('orientjs/lib/db/query');

/**
 * OQuery & SessionQuery Reactive Extensions
 *
 * Use this if you want to exec Query by subscribing to Observable
 *
 * Unsubscribe should work as expected and will close the connection
 */
declare module "orientjs" {
  export interface QueryParams {
    [key: string]: any
  }
  export interface OQuery<T> {
    observable: (params?: QueryParams) => Observable<T>;
    one$: (params?: QueryParams) => Observable<T>;
    all$: (params?: QueryParams) => Observable<T[]>;
  }
}

Query.prototype.observable = function <R>(params?): Observable<R> {
// console.log('DB', this.db.name)
  return new Observable<R>(subscriber => {
    if (params) {
      this.addParams(params);
    }
    const stream =  this.db.batch(this.buildStatement(), this.buildOptions())

    stream.on("data", (data: any) => subscriber.next(data))
    stream.once('error', (err) => subscriber.error(err))
    stream.once("end", () => subscriber.complete());

    return () => stream.close()
  }).pipe(
    map(row => this._processResults([row])[0])
  );
}
Query.prototype.all$ = function <R>(params?): Observable<R[]> {
  return this.observable().pipe(
    reduce((acc, v) => {
      acc.push(v);
      return acc as any;
    }, [])
  );
}
Query.prototype.one$ = function <R>(params?): Observable<R> {
  return this.all$().pipe(
    map(rows => rows[0])
  );
}

/**
 * OResult Reactive Extensions
 *
 * Use this if you want to convert result to Observable
 *
 * Unsubscribe should work as expected and will close the connection
 */
declare module "orientjs" {
  export interface OResult<R> {
    observable: () => Observable<R>;
    one$: () => Observable<R>;
    all$: () => Observable<R[]>;
  }
}

Result.prototype.observable = function <R>(): Observable<R> {
  return new Observable<R>(subscriber => {

    this.on("data", (data: any) => subscriber.next(data))
    this.once('error', (err) => subscriber.error(err))
    this.once("end", () => subscriber.complete());

    return () => this.close()
  });
}
Result.prototype.all$ = function <R>(): Observable<R[]> {
  return this.observable().pipe(
    reduce((acc, v) => {
      acc.push(v);
      return acc as any;
    }, [])
  );
}
Result.prototype.one$ = function <R>(): Observable<R> {
  return this.all$().pipe(
    map(rows => rows[0])
  );
}

/**
 * ODatabaseSession Reactive Extensions
 *
 * Here the lazy excecution of source is working as expected with Observables
 * And unsubscribe as well
 */

export interface OrientRow {
  '@rid': ORID,
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

DatabaseSession.prototype.query$ = function (query, options) {
  return new Observable(subscriber => {

    const stream: OResult<any> = this.query(query, options);

    stream
      .on("data", (data: any) => subscriber.next(data))
      .on('error', (err) => subscriber.error(err))
      .on("end", () => subscriber.complete());

    return () => stream.close()
  });
}

DatabaseSession.prototype.queryAll$ = function (query, options) {
  return this.query$(query, options).pipe(
    reduce((acc, v) => {
      acc.push(v);
      return acc as any;
    }, [])
  );
}

DatabaseSession.prototype.queryOne$ = function (query, options) {
  return this.query$(query, options).pipe(
    take(1)
  );
}

DatabaseSession.prototype.liveQuery$ = function (query, options) {
  return new Observable(subscriber => {

    const stream: LiveQuery = this.liveQuery(query, options);

    stream
      .on("data", (data: any) => subscriber.next(data))
      .on('error', (err) => subscriber.error(err))
      .on("end", () => subscriber.complete());

    return () => stream.unsubscribe()
  });
}

DatabaseSession.prototype.command$ = function (query, options) {
  return new Observable(subscriber => {

    const stream: OResult<any> = this.command(query, options);

    stream
      .on("data", (data: any) => subscriber.next(data))
      .on('error', (err) => subscriber.error(err))
      .on("end", () => subscriber.complete());

    return () => stream.close()
  });
}
