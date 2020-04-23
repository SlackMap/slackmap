import { Injectable, HttpService } from '@nestjs/common';
import { FacebookClient } from '@slackmap/api/facebook';
import { Observable, of } from 'rxjs';
import { FacebookFixture } from './facebook.fixture';

const http: Partial<HttpService> = {
  get(url, config): Observable<any> {
    if (url === `https://graph.facebook.com/${FacebookClient.version}/me`) {
      const data = FacebookFixture.getByToken(config.params.access_token);
      return of({data});
    }
    throw new Error(`Request to ${url} needs mocking implementation in FacebookClientMock`)
  }
}
@Injectable()
export class FacebookClientMock extends FacebookClient {

  constructor() {
    super(http as HttpService);
  }
}
