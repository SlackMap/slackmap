import { Injectable, Logger, Optional } from '@nestjs/common';
const logger = new Logger('AuthConfig');

@Injectable()
export class AuthConfig {
  readonly JWT_SECRET = process.env.JWT_SECRET;

  constructor(@Optional() options: Partial<AuthConfig> = {}) {
    Object.assign(this, options);
    Object.keys(this).forEach(key => {
      if (this[key] === undefined || this[key] === NaN) {
        logger.error(key + ' in env is missing');
      }
    })
  }
}
