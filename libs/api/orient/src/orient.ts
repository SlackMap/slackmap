import { Injectable } from '@nestjs/common';
import { OrientConfig } from 'config';
import { Db } from 'orientjs';
const OrientDBClient = require('orientjs').OrientDBClient;

import * as RecordId from 'orientjs/lib/recordid';
import * as ODatabase from 'orientjs/lib/db/odatabase';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { OnModuleDestroy } from '@nestjs/common';

const debugOrient = require('debug')('config:db');

@Injectable()
export class Orient implements OnModuleDestroy {
  private _db: Promise<Db>;
  private _client: Promise<OrientClient>;
  private _pool: Promise<OrientPool>;

  static toRid(rid: string) {
    return RecordId.parse(rid);
  }

  static now(): string {
    return new Date().toJSON();
  }

  constructor(private config: OrientConfig) {
    console.log('Create Orient instance...');
  }

  onModuleDestroy() {
    console.log(`Destroy Orient connection...`);
    this.close();
  }
  query<T>(query: string, options?: any): Promise<T[]> {
    console.log('QUERY', query, options);
    return this.db()
      .then<T[]>(db => db.command(query, options))
      .all();
  }

  /**
   * create orientdb client connection
   */
  client(): Promise<OrientClient> {
    if (this._client) {
      return this._client;
    }
    this._client = OrientDBClient.connect({
      host: this.config.host,
      port: this.config.port,
    }).then(client => {
      this._pool = client.sessions({
        username: this.config.username,
        password: this.config.password,
        name: this.config.db.name,
        pool: { max: 10 },
      });
    });
    return this._client;
  }

  async session(): Promise<OrientSession> {
    return this.client()
      .then(client => this._pool)
      .then(pool => pool.acquire());
  }

  db(): Promise<Db> {
    if (this._db) {
      return this._db;
    }
    const self = this;
    this._db = OrientDBClient.connect({
      host: this.config.host,
      port: this.config.port,
    }).then(client => {
      console.log('CLIENT', client.session);
      return client.session({
        username: this.config.username,
        password: this.config.password,
        name: this.config.db.name,
      });
    });

    // this._db = new Promise((resolve, reject) => {

    //   const db = new ODatabase({
    //     host: this.config.host,
    //     port: this.config.port,
    //     username: this.config.username,
    //     password: this.config.password,
    //     name: this.config.db.name
    //   });

    //   // on error reset connection
    //   db.on('endQuery', function (obj) {
    //     if (obj.err && obj.err.code === 'ECONNREFUSED') {
    //       self._db = null;
    //       db.emit('close');
    //       // db.close();
    //     }
    //   });
    //   db.open().then(
    //     function () {
    //       resolve(db);
    //     },
    //     err => {
    //       self._db = null;
    //       reject(err);
    //       // db.close();
    //     }
    //   );
    // });

    return this._db;
  }

  close() {
    if (this._db) {
      return this._db.then(db => db.close());
    }
  }

  db$(config: OrientConfig) {
    /**
     * store global hot connection
     */
    let hot$;

    /**
     * create orientdb connection stream
     *
     * @returns {Observable|*}
     */
    function createStream(testInterval?: boolean) {
      const observable: Observable<ODatabase> = Observable.create(function(
        observer,
      ) {
        debugOrient('DB SUBSCRIBE');

        const db = new ODatabase({
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          name: config.db.name,
        });
        db.on('endQuery', function(obj) {
          if (obj.err && obj.err.code === 'ECONNREFUSED') {
            debugOrient('DB QUERY ERROR', obj.err.code);
            observer.error(obj.err);
          }
        });
        db.open()
          .then(function() {
            // helper for generation of timestamps for use in writing to db
            db.now = () => {
              return new Date().toJSON();
            };
            debugOrient('DB OPENED', testInterval);
            if (testInterval) {
              test(db, testInterval);
            }
            observer.next(db);
          })
          .catch(err => {
            debugOrient('DB OPEN ERROR', err);
            observer.error(err);
          });

        // no subscribers, close db
        return function unsubscribe() {
          debugOrient('DB UNSUBSCRIPBE');
          // TODO close if not closed already
          // db.close().then(function () {
          //    debugOrient('DB CLOSED');
          // });
        };
      });

      return observable;
    }

    /**
     * test db connection if it's still running
     */
    function test(db, interval) {
      setTimeout(() => {
        db.select('name')
          .from('OUser')
          .one()
          .then(
            data => {
              debugOrient('QUERY RESULT', data.name);
              test(db, interval);
            },
            err => {
              debugOrient('QUERY RESULT ERROR', err.message);
              // test(db);
            },
          );
      }, interval);
    }

    /**
     * return shared hot stream or if passed true new cold stream
     */
    return function(cold, testInterval) {
      if (cold) {
        return createStream(testInterval);
      } else if (hot$) {
        return hot$;
      } else {
        hot$ = createStream().pipe(share());
        return hot$;
      }
    };
  }
}
