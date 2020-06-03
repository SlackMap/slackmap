import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as actions from './auth.actions';
import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { UiConfig } from '@slackmap/ui/config';
import { UiApiService } from '@slackmap/ui/api';
import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Dispatcher } from '@slackmap/ui/common/dispatcher';
import { AuthSignUpByFacebookRequestDto } from '@slackmap/api/auth/dto';

@Injectable()
export class AuthFacade {
  loading$: Observable<void>;
  user$ = this.store.pipe(select(AuthSelectors.getUser));
  signUpByFacebook$ = this.store.pipe(select(AuthSelectors.getSignUpByFacebook));

  constructor(
    private actions$: Actions,
    private dsipatcher: Dispatcher,
    private store: Store<fromAuth.AuthPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  signIn(): Observable<void> {
    return this.dsipatcher.run(actions.signIn(), [
      actions.signInCancel,
      actions.signInSuccess,
    ])
  }
  signInByFacebook(): Observable<void> {
    return this.dsipatcher.run(actions.signInByFacebook(), [
      actions.fbLoginSuccess,
      actions.fbLoginFailure,
      actions.signInByFacebookFailure,
      actions.signInByFacebookSuccess,
      actions.signUpByFacebookRequired,
    ])
  }
  signUpByFacebook(payload: AuthSignUpByFacebookRequestDto): Observable<void> {
    return this.dsipatcher.run(actions.signUpByFacebook({payload}), [
      actions.signUpByFacebookFailure,
      actions.signUpByFacebookSuccess,
      actions.signUpByFacebookCancel,
    ])
  }

}
