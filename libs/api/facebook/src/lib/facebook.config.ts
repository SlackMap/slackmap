import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FacebookConfigOptions {
  app_id: string;
  secret: string;
}

@Injectable()
export class FacebookConfig {
  app_id = '';
  secret = '';
  scope = ['email'];
  constructor(@Inject(FacebookConfigOptions) data: Partial<FacebookConfigOptions> = {}) {
    Object.assign(this, data);
  }
}
