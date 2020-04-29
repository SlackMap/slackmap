import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import "./rx/orientjs-rx";
import { OrientConfig } from './orient.config';
import { OrientDBClient, ODatabaseSession, QueryOptions, ODatabaseSessionPool } from 'orientjs';
import { Observable, Subject, from, of } from 'rxjs';
import { takeUntil, reduce, take, switchMap } from 'rxjs/operators';
import { OrientConnection } from './orient.interfaces';
import { acquire } from './operators/acquire.operator';
import { streamMap } from './operators/stream-map.operator';
import { liveQueryMap } from './operators/live-query-map.operator';
import { LiveQueryEvent } from './rx/orientjs-rx';

@Injectable()
export class OrientService implements OnApplicationShutdown {

  readonly logger = new Logger('OrientService');
  private _connection: Promise<OrientConnection> | null = null;
  destroy$ = new Subject();

  constructor(
    private config: OrientConfig,
  ) { }

  /**
   * Single instance of server connection
   *
   * Returned value: {client, pool, session}
   *
   */
  private connect(): Promise<OrientConnection> {
    if (!this._connection) {

      const client = new OrientDBClient({
        host: this.config.ORIENTDB_HOST,
        port: this.config.ORIENTDB_PORT,
        pool: { max: 25, min: 1 },
      });

      this.logger.log('Connecting...')
      this._connection = client.connect()
        .then(() => {
          // handle connection lost
          // @ts-ignore
          client.cluster.servers[0].network.on('error', err => {
            this.logger.error('Connection LOST :(');
            this.logger.error(err.message, err.stack)
            this._connection = null;
            this.destroy$.next();
          })
          // start sessions pool
          return client.sessions({
            username: this.config.ORIENTDB_DB_USERNAME,
            password: this.config.ORIENTDB_DB_PASSWORD,
            name: this.config.ORIENTDB_DB_NAME
          })
        })
        // start single session
        .then(pool => {
          return pool.acquire().then(session => ({ session, pool }))
        })
        .then(({ pool, session }) => {
          this.logger.log('Connecting SUCCESS :)');
          return {
            client,
            pool,
            session
          };
        })
        .catch((err: Error) => {
          this.logger.error('Connecting ERROR :(');
          this.logger.error(err.message, err.stack);
          this._connection = null;
          this.destroy$.next();
          return Promise.reject(err);
        });
    }
    return this._connection;

  }

  async onApplicationShutdown() {
    this.logger.log(`Application Shutdown...`);
    this.destroy$.next();
    this.destroy$.complete();
    if (this._connection) {
      this.logger.log('Closing connection...');
      return this._connection.then(con => con.client.close());
    }
  }

  /**
   * Client connected to database
   * This will lazy instantiate and connect
   */
  client(): Promise<OrientDBClient> {
    return this.connect().then(connection => connection.client);
  }

  /**
   * Get the pool of sessions
   * You can acquire single session and do some operations
   *
   * Remember to close the session after you finish your work !!!
   */
  pool(): Promise<ODatabaseSessionPool> {
    return this.connect().then(connection => connection.pool);
  }

  /**
   * Get singleton session
   *
   * Don't close it !!!
   *
   * Should live until the app shutdown
   */
  session(): Promise<ODatabaseSession> {
    return this.connect().then(connection => connection.session);
  }

  /**
   * Acquire session from the pool, and keeps it open until subscription is live
   *
   * Session will be returned to the pool when subscriber unsubscribes
   */
  acquire$(): Observable<ODatabaseSession> {
    return from(this.connect()).pipe(
      takeUntil(this.destroy$),
      acquire()
    );
  }

  /**
   * Each row will be returned in stream and separate events
   *
   * @param query SQL query
   * @param options
   */
  query$<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.acquire$().pipe(
      streamMap<T>(db => db.query(query, options))
    )
  }
  /**
   * All rows will be returned as array in one event
   *
   * @param query SQL Query
   * @param options
   */
  queryAll$<T>(query: string, options?: QueryOptions): Observable<T[]> {
    return this.acquire$().pipe(
      streamMap<T>(db => db.query(query, options)),
      reduce((acc, v) => {
        acc.push(v);
        return acc as any;
      }, [])
    )
  }

  /**
   * Only first row will be returned
   *
   * @param query SQL query
   * @param options
   */
  queryOne$<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.acquire$().pipe(
      streamMap<T>(db => db.query(query, options)),
      take(1)
    )
  }

  /**
   * Execute command that will modify the database
   * Only first event will be returned as it always should be only one
   *
   * @param query
   * @param options
   */
  command$<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.acquire$().pipe(
      streamMap<T>(db => db.command(query, options))
    )
  }

  /**
   *
   * @param query SQL query string
   * @param options
   */
  liveQuery$<T>(query: string, options?: QueryOptions): Observable<LiveQueryEvent<T>> {
    return new Observable(subscriber => subscriber.next(1)).pipe(
      switchMap(() => from(this.connect())),
      liveQueryMap<T>(session => session.liveQuery(query, options))
    )
  }
}

