import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { ValidationError } from '@slackmap/api/common';
import { switchMap } from 'rxjs/operators';
import { FacebookUserModel } from './models';

@Injectable()
export class FacebookClient {
  private version = 'v6.0';
  constructor(
    private http: HttpService
  ) {}

  /**
   * returns profile for access token fom facebook
   *
   * @param accessToken
   * @returns {Promise<FbProfile>}
   */
  me(accessToken: string, fields = ['id', 'email', 'first_name', 'last_name', 'picture', 'name']): Observable<FacebookUserModel> {
    return this.http.get(`https://graph.facebook.com/${this.version}/me`, {
      params: {
        fields: fields.join(','),
        access_token: accessToken,
      },
    }).pipe(
      switchMap(({data}) => {
        if (data.error) {
          return throwError(new ValidationError({
            title: `We can't get your facebook profile :(`,
            message: data.error.message,
            data: { retry: true },
            parent: data.error
          }))
        }
        if (!data.id) {
          return throwError(new ValidationError({
            title: `We can't get your facebook profile :(`,
            data: { retry: true }
          }))
        }
        return of(data);
      })
    );

  }
}
