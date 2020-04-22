import {Injectable} from '@nestjs/common';
import { FacebookClient } from '@slackmap/api/facebook';
import { FacebookUserModel } from '@slackmap/api/facebook/dto';
import { Observable, of, throwError } from 'rxjs';
import { FacebookFixture } from './facebook.fixture';
import { ValidationError } from '@slackmap/api/common';

@Injectable()
export class FacebookClientMock extends FacebookClient {

  /**
   * TODO
   * better to mock axios http client, or use Polly.js,
   * be course now andy change to original method will have to be done also here, so it's easy to forget
   * but now we are in hurry so have to stay like this ;)
   */
  me(accessToken: string, fields?: string[]): Observable<FacebookUserModel> {
    const profile = FacebookFixture.getByToken(accessToken);
    if (!profile) {
      return throwError(new ValidationError({
        title: `We can't get your facebook profile :(`,
        message: 'message from FB response',
        data: { retry: true },
        parent: {name: 'Error', message: 'message from FB response'}
      }))
    }
    if (!profile.id) {
      return throwError(new ValidationError({
        title: `We can't get your facebook profile :(`,
        data: { retry: true }
      }))
    }
    return of(profile);
  }
}
