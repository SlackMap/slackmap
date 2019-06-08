declare module 'orientjs' {
  import { EventEmitter } from 'events';

  export class OrientDBClient extends EventEmitter {

    static connect: (config: OrientDBClientConfig) => Promise<OrientDBClient>;

    connect: () => Promise<OrientDBClient>;

    /**
     * Create an OrientDBClient;
     */
    constructor(config: OrientDBClientConfig);

    /**
     * Open a pool of sessions with a given config
     */
    sessions: (config: ODatabaseSessionPoolConfig) => Promise<ODatabaseSessionPool>;

    /**
     * Open single session
     */
    session: (config: ODatabaseSessionConfig) => Promise<ODatabaseSession>;

    close(): Promise<void>;
  }

  export class Server extends EventEmitter {

    static connect: (config: OrientDBClientConfig) => Promise<OrientDBClient>;

    connect: () => Promise<OrientDBClient>;

    /**
     * Create an OrientDBClient;
     */
    constructor(config: OrientDBClientConfig);

    /**
     * Open a pool of sessions with a given config
     */
    sessions: (config: ODatabaseSessionPoolConfig) => Promise<ODatabaseSessionPool>;

    /**
     * Open single session
     */
    session: (config: ODatabaseSessionConfig) => Promise<ODatabaseSession>;

    close(): Promise<void>;
  }

  /**
   * Create an OrientDBClient;
   * @param {String} [config.host=localhost] OrientDB address
   * @param {Number} [config.port=2424] OrientDB port
   * @param {Array}  [config.servers=[]] Additional servers for HA
   * @param {Object} [config.pool={ max: 5, min :1 }] Connection pool settings
   * @param {Object} [config.subscribePool={ max:2 }] Connection pool settings for subscriber operations
   * @param {Object} [config.logger=null] OrientJS Logger
   */
  export interface OrientDBClientConfig {
    host?: string;
    port?: number;
    servers?: any[];
    pool?: { max?: number; min?: number };
    subscribePool?: { max: number };
    logger?: any;
  }

  /**
   * Open a pool of sessions with a given config
   * @param {Object} config
   * @param {Object} options Session options
   * @param {String} options.name Database name
   * @param {String} options.username Username
   * @param {String} options.password Password
   * @param {Object} [options.pool={min : 1,max :5}] Pool configuration
   * @returns {Promise<ODatabasePool>}
   */
  export interface ODatabaseSessionPoolConfig {
    name?: string;
    username?: string;
    password?: string;
    pool: { max?: number; min?: number };
  }

  export interface ODatabaseSessionConfig {
    name?: string;
    username?: string;
    password?: string;
  }

  export class ODatabaseSessionPool {

    constructor(client: OrientDBClient, config: ODatabaseSessionPoolConfig)

    acquire: () => Promise<ODatabaseSession>;
    close(): Promise<void>;

    on(event: string, cb: (data: any) => void): any;

  // createError(err): errors.DatabaseError
  // createPool(config, params): ODatabasePoolFactory;
}

export interface ODatabaseSession {
  query<T>(query: string, options?: QueryOptions): ResultStream<T>;
  command<T>(command: string, options?: QueryOptions): ResultStream<T>;
  batch<T>(command: string, options?: QueryOptions): ResultStream<T>;
  liveQuery(command: string, options?: QueryOptions): LiveQueryHandler;
  begin(): void;
  on(event: string, cb: (data: any) => void): any;
  runInTransaction(commandsFactory: (tx) => void): Promise<{ result: any, tx: any }>;
  close(): Promise<void>;
}

export interface ResultStream<T> {
  all: () => Promise<[T]>;
  one: () => Promise<T>;
  on: (event: string, callback: (data: T) => void) => ResultStream<T>;
  set: (params: any) => ResultStream<T>;
  into: (name: string) => ResultStream<T>;
}

export interface QueryOptions {
  params?: any;
  pageSize?: number;
}

export class LiveQueryHandler extends EventEmitter {
  unsubscribe(): Promise<void>
}

export enum LiveQueryEvents {
  INSERT = "live-insert",
  UPDATE = "live-update",
  DELETE = "live-delete",
  CREATE = "live-create",
  END = "live-end"
}

// OrientDB.RecordID = OrientDB.RecordId = OrientDB.RID = require('./recordid');
// OrientDB.RIDBag = OrientDB.Bag = require('./bag');
// OrientDB.Server = require('./server');
// OrientDB.Db = require('./db');
// OrientDB.Pool = require('./client/pool').Pool;
// OrientDB.ODatabase = require('./db/odatabase');
// OrientDB.Statement = OrientDB.Db.Statement;
// OrientDB.Query = OrientDB.Db.Query;
// OrientDB.transport = require('./transport');
// OrientDB.errors = require('./errors');
// OrientDB.Migration = require('./migration');
// OrientDB.CLI = require('./cli');
// OrientDB.utils = require('./utils');
// OrientDB.jsonify = OrientDB.utils.jsonify;
// OrientDB.OrientDBClient = require('./client').OrientDBClient;

/**
 * A list of orientdb data types, indexed by their type id.
 * @type {Object}
 */
enum DataTypes {
  Boolean = 0,
  Integer = 1,
  Short = 2,
  Long = 3,
  Float = 4,
  Double = 5,
  Datetime = 6,
  string = 7,
  Binary = 8,
  Embedded = 9,
  EmbeddedList = 10,
  EmbeddedSet = 11,
  EmbeddedMap = 12,
  Link = 13,
  LinkList = 14,
  LinkSet = 15,
  LinkMap = 16,
  Byte = 17,
  Transient = 18,
  Date = 19,
  Custom = 20,
  Decimal = 21,
  LinkBag = 22,
  Any = 23
}
}
