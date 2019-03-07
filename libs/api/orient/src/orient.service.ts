import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OrientConfig } from './orient.config';
import { OrientDBClient, ODatabaseSessionPool, ODatabase } from 'orientjs';

@Injectable()
export class OrientService implements OnModuleDestroy {

  private _client: Promise<OrientDBClient>;
  private _pool: Promise<ODatabaseSessionPool>;

  constructor(private config: OrientConfig) {}


  onModuleDestroy() {
    console.log(`Destroy Orient connection...`);
    this.close();
  }

  async close() {
    if (this._pool) {
      await this._pool.then(pool => pool.close());
      this._pool = null;
    }
    if (this._client) {
      await this._client.then(client => client.close());
      this._client = null;
    }
  }

  /**
   * create orientdb client connection
   */
  client(): Promise<OrientDBClient> {
    if (this._client) {
      return this._client;
    }
    this._client = OrientDBClient.connect({
      host: this.config.ORIENT_HOST,
      port: this.config.ORIENT_PORT
    });
    return this._client;
  }

  /**
   * create orientdb session pool
   */
  pool(): Promise<ODatabaseSessionPool> {
    if (this._pool) {
      return this._pool;
    }
    this._pool = this.client().then(client => {
      return client.sessions({
        username: this.config.ORIENT_DB_USERNAME,
        password: this.config.ORIENT_DB_PASSWORD,
        name: this.config.ORIENT_DB_NAME,
        pool: { max: 10 }
      });
    });
    return this._pool;
  }

  /**
   * Get db instance to work on it
   */
  async acquire(): Promise<ODatabase> {
    const pool = await this.pool();
    return await pool.acquire();
  }
}
