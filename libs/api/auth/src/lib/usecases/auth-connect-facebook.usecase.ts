import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthConnectFacebookRequestDto, AuthConnectFacebookDto } from '../dto';
import { FacebookClient } from '@slackmap/api/facebook';
import { UserService, AuthService } from '../services';

@Injectable()
export class AuthConnectFacebookUseCase {
  constructor(
    private facebookClient: FacebookClient,
    private userService: UserService,
    private authService: AuthService,
  ) { }
  process(request: AuthConnectFacebookRequestDto): Observable<AuthConnectFacebookDto> {

    return this.facebookClient.me(request.accessToken).pipe(
      switchMap(fbUser => this.userService.findByFacebookProfile(fbUser).pipe(map(users => ({fbUser, users})))),
      map(({fbUser, users}) => {
        let user = null;
        if (users.length) {
          user = users[0];
        }

        const api_token = this.authService.sign({
          facebook_profile: fbUser,
          user
        });
        return {
          facebookProfile: fbUser,
          api_token,
          users,
          user
        };
      })
    );



  }
}
