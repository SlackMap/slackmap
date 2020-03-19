import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { OrientConfig } from './orient.config';
import { OrientDBClient, ODatabaseSession, QueryOptions } from 'orientjs';
import { Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil, reduce, take, tap } from 'rxjs/operators';
import { OrientConnection } from './orient.interfaces';
import { acquire } from './operators/acquire.operator';
import { streamMap } from './operators/stream-map.operator';
import { liveQueryMap } from './operators/live-query-map.operator';

@Injectable()
export class OrientService implements OnModuleDestroy {
  destroy$ = new Subject();
  private readonly logger = new Logger('OrientService');

  /**
   * Single instance of server connection
   *
   * Returned value: {client, pool}
   *
   * @memberof OrientService
   */
  connection$ = new Observable<OrientConnection>((subscriber) => {
      const client = new OrientDBClient({
        host: this.config.ORIENTDB_HOST,
        port: this.config.ORIENTDB_PORT,
        pool: { max: 25, min: 1 },
      });

      this.logger.log('Connecting...')
      client.connect()
      .then(() => client.sessions({
        username: this.config.ORIENTDB_DB_USERNAME,
        password: this.config.ORIENTDB_DB_PASSWORD,
        name: this.config.ORIENTDB_DB_NAME
      }))
      .then(pool => {
        this.logger.log('Connecting SUCCESS :)');
        subscriber.next({
          client,
          pool
        })
      })
      .catch((err: Error) => {
        this.logger.error('Connecting ERROR :(');
        this.logger.error(err.message, err.stack);
        subscriber.error(err);
      });

      // handle connection lost
      (client as any).cluster.servers[0].network.on('error', err => {
        this.logger.error('Connection INTERRUPTED :(');
        this.logger.error(err.message, err.stack)
        subscriber.error(err)
        // this.destroy$.next();
      })

      return () => {
        this.logger.log('Connection CLOSED');
        client.close().catch(err => this.logger.error(err.message, err.stack));
      }

  }).pipe(
    takeUntil(this.destroy$),
    shareReplay({
      bufferSize: 1,
      refCount: false // this connection wil live even without subscribers
    }),
  );

  /**
   * Acquire session from the pool
   *
   * @memberof OrientService
   */
  acquire$: Observable<ODatabaseSession> = this.connection$.pipe(
    acquire()
  )

  constructor(
    private config: OrientConfig,
  ) { }

  onModuleDestroy() {
    this.logger.log(`Destroy connection...`);
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Each row will be returned in stream and separate events
   *
   * @param query SQL query
   * @param options
   */
  query<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.acquire$.pipe(
      streamMap<T>(db => db.query(query, options))
    )
  }
  /**
   * All rows will be returned as array in one event
   *
   * @param query SQL Query
   * @param options
   */
  queryAll<T>(query: string, options?: QueryOptions): Observable<T[]> {
    return this.acquire$.pipe(
      streamMap<T>(db => db.query(query, options)),
      reduce((acc, v) => {
        acc.push(v);
        return acc as any;
      }, [])
    )
  }
  /**
   *
   * @param query SQL query
   * @param options
   */
  queryOne<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.acquire$.pipe(
      streamMap<T>(db => db.query(query, options)),
      take(1)
    )
  }

  command<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.acquire$.pipe(
      streamMap<T>(db => db.command(query, options))
    )
  }

  /**
   *
   * @param query SQL query string
   * @param options
   */
  liveQuery<T>(query: string, options?: QueryOptions): Observable<T> {
    return this.connection$.pipe(
      liveQueryMap<T>(db => db.liveQuery(query, options))
    )
  }
}

