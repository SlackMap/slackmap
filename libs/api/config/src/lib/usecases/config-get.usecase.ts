import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ConfigGetDto } from '../dto';
import { FacebookConfig } from '@slackmap/api/facebook';
import { AppConfig } from '../app.config';

@Injectable()
export class ConfigGetUseCase {
  constructor(
    private appConfig: AppConfig,
    private facebookConfig: FacebookConfig
  ) { }
  process(): Observable<ConfigGetDto> {
    return of({
      config: {
        appHost: this.appConfig.APP_HOST,
        apiHost: this.appConfig.API_HOST,
        facebookAppId: this.facebookConfig.FACEBOOK_APP_ID,
        facebookScope: this.facebookConfig.FACEBOOK_SCOPE
      }
    });
  }
}
