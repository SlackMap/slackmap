import { Injectable, Optional } from '@nestjs/common';

@Injectable()
export class OrientConfig {
  readonly ORIENT_HOST: string = process.env.ORIENT_HOST; // localhost
  readonly ORIENT_PORT: number = parseInt(process.env.ORIENT_PORT, 10); // 2425
  readonly ORIENT_ROOT_USERNAME: string = process.env.ORIENT_ROOT_USERNAME; // root
  readonly ORIENT_ROOT_PASSWORD: string = process.env.ORIENT_ROOT_PASSWORD; // root
  readonly ORIENT_DB_NAME: string = process.env.ORIENT_DB_NAME; // smdb
  readonly ORIENT_DB_USERNAME: string = process.env.ORIENT_DB_USERNAME; // smuser
  readonly ORIENT_DB_PASSWORD: string = process.env.ORIENT_DB_PASSWORD; // smuser

  constructor(@Optional() options: Partial<OrientConfig> = {}) {
    Object.assign(this, options);
  }
}
