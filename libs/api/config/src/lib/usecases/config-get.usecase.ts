import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ConfigGetDto } from '../dto';
import { FacebookConfig } from '@slackmap/api/facebook';
import { AppConfig } from '@slackmap/api/common';

@Injectable()
export class ConfigGetUseCase {
  constructor(
    private appConfig: AppConfig,
    private facebookConfig: FacebookConfig
  ) { }
  async process(): Promise<ConfigGetDto> {
    return {
      config: {
        APP_HOST: this.appConfig.APP_HOST,
        API_HOST: this.appConfig.API_HOST,
        FACEBOOK_APP_ID: this.facebookConfig.FACEBOOK_APP_ID,
        FACEBOOK_SCOPE: this.facebookConfig.FACEBOOK_SCOPE
      }
    };
  }
}
