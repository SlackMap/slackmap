import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromAuth from './auth.reducer';
import * as authActions from './auth.actions';
import { AuthService } from '../services';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UiConfig } from '@slackmap/ui/config';
import { UiApiService } from '@slackmap/ui/api';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  /**
   * step 1 - login by fb js sdk
   */
  fbLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.fbLogin),
      switchMap(() => this.authService.fbLogin(this.config.FACEBOOK_SCOPE).pipe(
        map((res) => authActions.fbLoginSuccess(res))
      ))
    )
  );

  /**
   * step 2 - use accessToken from step 1 & try to login
   */
  signInByFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.fbLoginSuccess),
      switchMap((token) => this.api.authSignInByFacebook(token).pipe(
        map((response) => {
          if(response.user) {
            return authActions.signInByFacebookSuccess(response);
          } else {
            return authActions.signUpByFacebookRequired(response)
          }
        })
      ))
    )
  );

  /**
   * step 3 - if user does not exist & we have to sign up
   */
  signUpByFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUpByFacebook),
      switchMap(({payload}) => this.api.authSignUpByFacebook(payload).pipe(
        map((response) => authActions.signUpByFacebookSuccess({payload: response})),
        catchError((error) => of(authActions.signUpByFacebookFailure({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private config: UiConfig,
    private api: UiApiService,
  ) {}
}
