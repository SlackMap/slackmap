import { Injectable, Optional, Logger } from '@nestjs/common';
const logger = new Logger('FacebookConfig');

@Injectable()
export class FacebookConfig {
  readonly FACEBOOK_APP_ID: string = process.env.FACEBOOK_APP_ID;
  readonly FACEBOOK_SECRET: string = process.env.FACEBOOK_SECRET;
  readonly FACEBOOK_SCOPE: string[] = (process.env.FACEBOOK_SCOPE) ? process.env.FACEBOOK_SCOPE.split(','): [];

  constructor(@Optional() options: Partial<FacebookConfig> = {}) {
    Object.assign(this, options);
    Object.keys(this).forEach(key => {
      if (this[key] === undefined || this[key] === NaN) {
        logger.error(key + ' in env is missing');
      }
    })
  }
}
