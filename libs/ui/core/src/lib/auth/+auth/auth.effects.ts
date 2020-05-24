import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromAuth from './auth.reducer';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services';
import { switchMap, map } from 'rxjs/operators';
import { UiConfig } from '@slackmap/ui/config';
import { UiApiService } from '@slackmap/ui/api';

@Injectable()
export class AuthEffects {

  /**
   * step 1 - login by fb js sdk
   */
  fbLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fbLogin),
      switchMap(() => this.authService.fbLogin(this.config.FACEBOOK_SCOPE).pipe(
        map((res) => AuthActions.fbLoginSuccess(res))
      ))
    )
  );

  /**
   * step 2 - use accessToken from step 1 & try to login
   */
  connectByFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fbLoginSuccess),
      switchMap((token) => this.api.authSignInByFacebook(token).pipe(
        map((response) => {
          if(response.user) {
            return AuthActions.signInByFacebookSuccess(response);
          } else {
            return AuthActions.signUpByFacebookRequired(response)
          }
        })
      ))
    )
  );

  /**
   * step 3 - if user does not exist & we have to sign up
   */

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private config: UiConfig,
    private api: UiApiService,
  ) {}
}
