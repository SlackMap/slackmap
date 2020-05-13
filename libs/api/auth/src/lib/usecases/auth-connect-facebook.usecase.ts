import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthConnectFacebookRequestDto, AuthConnectFacebookDto } from '../dto';
import { FacebookClient } from '@slackmap/api/facebook';
import { AuthService } from '../services';
import { UserRepository } from '@slackmap/api/db';

@Injectable()
export class AuthConnectFacebookUseCase {
  constructor(
    private facebookClient: FacebookClient,
    private userRepository: UserRepository,
    private authService: AuthService,
  ) { }
  process(request: AuthConnectFacebookRequestDto): Observable<AuthConnectFacebookDto> {

    return this.facebookClient.me(request.accessToken).pipe(
      // TODO search by email if not found by facebook id
      switchMap(facebookUser => from(this.userRepository.find({facebookId: facebookUser.id})).pipe(map(users => ({facebookUser, users})))),
      map(({facebookUser, users}) => {
        let user = null;
        if (users.length) {
          user = users[0];
        }

        const apiToken = this.authService.sign({
          facebookUser,
          user,
          users
        });
        return {
          facebookUser,
          apiToken,
          users,
          user
        };
      })
    );



  }
}
