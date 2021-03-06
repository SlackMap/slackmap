import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';

import * as fromAuth from './auth.reducer';
import * as authActions from './auth.actions';
import { AuthService } from '../services';
import { switchMap, map, catchError, takeUntil, startWith, exhaustMap, mergeMap } from 'rxjs/operators';
import { UiConfig, appConfigInit } from '@slackmap/ui/config';
import { UiApiService } from '@slackmap/ui/api';
import { of, Observable, EMPTY } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../dialogs';
import { ErrorService } from '@slackmap/ui/common/errors';
import { Action } from '@ngrx/store';
const AUTH_INIT_ACTION = '[AuthEffects] Init';

@Injectable()
export class AuthEffects implements OnInitEffects {

  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);


  /**
   * if apiToken exists, fetch the user session
   */
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.fetchUser, appConfigInit),
      switchMap(() => {
        const apiToken = this.api.getToken();
        if(apiToken) {
          return this.api.authMe().pipe(
            map((response) => authActions.signInByFacebookSuccess({payload: {apiToken, ...response}})),
            catchError(error => of(authActions.signInByFacebookFailure({error}))),
          )
        }
        return EMPTY;
      })
    )
  );

  /**
   * step 0 - open sign in dialog
   */
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signIn),
      exhaustMap(() => {
        return new Observable<never>(subscriber => {
          const dialogRef = this.dialog.open(LoginDialog, {
            disableClose: true,
            width: '50%',
            maxWidth: '100vw',
            maxHeight: '100vh',
          });
          const smallDialogSubscription = this.isExtraSmall.subscribe(size => {
            if (size.matches) {
              dialogRef.updateSize('100%', '100%');
            } else {
              dialogRef.updateSize();
            }
          });

          return () => {
            smallDialogSubscription.unsubscribe();
            dialogRef.close();
          }
        }).pipe(takeUntil(this.actions$.pipe(ofType(
          authActions.signInCancel,
          authActions.signInByFacebookSuccess,
          authActions.signUpByFacebookSuccess,
          ))));
      })
    )
  );

  /**
   * step 1 - sign in by fb js sdk
   */
  fbLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signInByFacebook),
      switchMap(() => this.authService.fbLogin(this.config.FACEBOOK_SCOPE).pipe(
        map((res) => authActions.fbLoginSuccess(res)),
        catchError(error => of(authActions.fbLoginFailure({error}))),
      ))
    )
  );

  /**
   * step 2 - use accessToken from step 1 & try to sign in into SlackMap
   */
  signInByFacebook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.fbLoginSuccess),
      switchMap((token) => this.api.authSignInByFacebook(token).pipe(
        map((response) => {
          if(response.user) {
            return authActions.signInByFacebookSuccess({payload: response}); // user exists and we are done
          } else {
            return authActions.signUpByFacebookRequired(response) // new user, sign up required
          }
        }),
        catchError(error => of(authActions.signInByFacebookFailure({error}))),
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

  /**
   * save apiToken as session
   */
  saveApiToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.signOut,
        authActions.signInByFacebookSuccess,
        authActions.signUpByFacebookSuccess,
      ),
      switchMap((action) => {
        if(action.type === authActions.signOut.type) {
          this.api.setToken(null)
        } else {
          this.api.setToken(action.payload.apiToken)
        }
        return EMPTY
      })
    )
  );

  /**
   * handle errors
   */
  errors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        authActions.fbLoginFailure,
        authActions.signInByFacebookFailure,
        authActions.signUpByFacebookFailure,
      ),
      mergeMap(({error}) => {
        this.errorService.show({error})
        return EMPTY
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private config: UiConfig,
    private api: UiApiService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private errorService: ErrorService,
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: AUTH_INIT_ACTION };
  }
}
