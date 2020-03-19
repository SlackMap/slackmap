import { Injectable, Optional } from '@nestjs/common';

@Injectable()
export class OrientConfig {
  readonly ORIENTDB_HOST: string = process.env.ORIENTDB_HOST; // localhost
  readonly ORIENTDB_PORT: number = parseInt(process.env.ORIENTDB_PORT, 10); // 2425
  readonly ORIENTDB_ROOT_USERNAME: string = process.env.ORIENTDB_ROOT_USERNAME; // root
  readonly ORIENTDB_ROOT_PASSWORD: string = process.env.ORIENTDB_ROOT_PASSWORD; // root
  readonly ORIENTDB_DB_NAME: string = process.env.ORIENTDB_DB_NAME; // smdb
  readonly ORIENTDB_DB_USERNAME: string = process.env.ORIENTDB_DB_USERNAME; // smuser
  readonly ORIENTDB_DB_PASSWORD: string = process.env.ORIENTDB_DB_PASSWORD; // smuser

  constructor(@Optional() options: Partial<OrientConfig> = {}) {
    Object.assign(this, options);
    Object.keys(this).forEach(key => {
      if (this[key] === undefined || this[key] === NaN) {
        console.error('ERROR:', this.constructor.name + ' requires ' + key + ' config property to be defined');
      }
    })
  }
}
