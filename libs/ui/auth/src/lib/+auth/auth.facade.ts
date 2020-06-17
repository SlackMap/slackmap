import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Dispatcher } from '@slackmap/ui/common/dispatcher';
import { AuthSignUpByFacebookRequestDto } from '@slackmap/api/auth/dto';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthFacade {
  loading$: Observable<void>;
  user$ = this.store.pipe(select(AuthSelectors.getUser));
  settings$ = this.store.pipe(select(AuthSelectors.getSettings));
  imperial$ = this.store.pipe(select(AuthSelectors.getSettings)).pipe(map(settings => settings.imperial));
  signUpByFacebook$ = this.store.pipe(select(AuthSelectors.getSignUpByFacebook));

  constructor(
    private actions$: Actions,
    private dsipatcher: Dispatcher,
    private store: Store<fromAuth.AuthPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  /**
   * Instead of dispatching SignIn action manually, you can use this Observable
   * It will complete after the SignIn process completes (with success or cancelation)
   */
  signIn(): Observable<void> {
    return this.dsipatcher.run(AuthActions.signIn(), [
      AuthActions.signInCancel,
      AuthActions.signInSuccess,
    ])
  }

  signInByFacebook(): Observable<void> {
    return this.dsipatcher.run(AuthActions.signInByFacebook(), [
      AuthActions.fbLoginSuccess,
      AuthActions.fbLoginFailure,
      AuthActions.signInByFacebookFailure,
      AuthActions.signInByFacebookSuccess,
      AuthActions.signUpByFacebookRequired,
    ])
  }

  signUpByFacebook(payload: AuthSignUpByFacebookRequestDto): Observable<void> {
    return this.dsipatcher.run(AuthActions.signUpByFacebook({payload}), [
      AuthActions.signUpByFacebookFailure,
      AuthActions.signUpByFacebookSuccess,
      AuthActions.signUpByFacebookCancel,
    ])
  }

}
