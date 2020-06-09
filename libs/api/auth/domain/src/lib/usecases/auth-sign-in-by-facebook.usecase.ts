import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FacebookClient } from '@slackmap/api/facebook';
import { UserRepository } from '@slackmap/api/auth/data';
import { Transactional } from '@liberation-data/drivine';
import { AuthSignInByFacebookRequestDto, AuthSignInByFacebookDto } from '@slackmap/api/auth/dto';
import { AuthService } from '../services';

@Injectable()
export class AuthSignInByFacebookUseCase {
  constructor(
    private facebookClient: FacebookClient,
    private userRepository: UserRepository,
    private authService: AuthService,
  ) { }
  // @Transactional()
  process(request: AuthSignInByFacebookRequestDto): Observable<AuthSignInByFacebookDto> {

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
