import {Injectable} from '@nestjs/common';
import { FacebookClient } from '@slackmap/api/facebook';
import { FacebookUserModel } from '@slackmap/api/facebook/dto';
import { Observable, of, throwError } from 'rxjs';
import { FacebookFixture } from './facebook.fixture';
import { ValidationError } from '@slackmap/api/common';

@Injectable()
export class FacebookClientMock extends FacebookClient {

  me(accessToken: string, fields?: string[]): Observable<FacebookUserModel> {
    const profile = FacebookFixture.getByToken(accessToken);
    if (!profile) {
      return throwError(new ValidationError({title: 'Facebook token invalid'}));
    }
    return of(profile);
  }
}
