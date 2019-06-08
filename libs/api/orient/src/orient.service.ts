import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OrientConfig } from './orient.config';
import { Server, OrientDBClient, ODatabaseSessionPool, ODatabaseSession } from 'orientjs';
import { Observable } from 'rxjs';

interface Db {
  pool: ODatabaseSessionPool,
  client: OrientDBClient
}

@Injectable()
export class OrientService implements OnModuleDestroy {

  client: OrientDBClient;
  pool: ODatabaseSessionPool;
  private connecting: Promise<void>;

  constructor(private config: OrientConfig) { }

  onModuleDestroy() {
    console.log(`Destroy Orient connection...`);
    this.close();
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
    this.pool = null;
    this.client = null;
    this.connecting = null;
  }

  /**
   * connect to db and create session pool
   */
  private async connect() {
    try {
      const client: any = new OrientDBClient({
        host: this.config.ORIENTDB_HOST,
        port: this.config.ORIENTDB_PORT,
      });
      // handle connection lost
      client.cluster.servers[0].network.on('error', err => this.close())

      await client.connect();

      const pool = await client.sessions({
        username: this.config.ORIENTDB_DB_USERNAME,
        password: this.config.ORIENTDB_DB_PASSWORD,
        name: this.config.ORIENTDB_DB_NAME,
        pool: { max: 25, min: 1 },
      });

      this.pool = pool;
      this.client = client;

    } catch (error) {
      this.connecting = null;
      throw error;
    }
  }

  /**
   * Get db instance to work on it
   */
  async acquire(): Promise<ODatabaseSession> {
    if (!this.client) {
      let c = this.connecting
      if (!c) {
        c = this.connecting = this.connect();
      }
      await c;
    }
    return await this.pool.acquire()
  }

}

