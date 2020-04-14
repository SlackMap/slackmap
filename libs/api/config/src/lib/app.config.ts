import { Injectable, Optional, Logger } from '@nestjs/common';
const logger = new Logger('AppConfig');

@Injectable()
export class AppConfig {
  readonly APP_HOST: string = process.env.APP_HOST;
  readonly API_HOST: string = process.env.API_HOST;

  constructor(@Optional() options: Partial<AppConfig> = {}) {
    Object.assign(this, options);
    Object.keys(this).forEach(key => {
      if (this[key] === undefined || this[key] === NaN) {
        logger.error(key + ' in env is missing');
      }
    })
  }
}
