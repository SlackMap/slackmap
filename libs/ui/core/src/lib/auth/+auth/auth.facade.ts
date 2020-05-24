import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as actions from './auth.actions';
import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { UiConfig } from '@slackmap/ui/config';
import { UiApiService } from '@slackmap/ui/api';
import { Observable } from 'rxjs';

@Injectable()
export class AuthFacade {
  user$ = this.store.pipe(select(AuthSelectors.getUser));
  signUpByFacebook$ = this.store.pipe(select(AuthSelectors.getSignUpByFacebook));

  constructor(
    private api: UiApiService,
    private config: UiConfig,
    private store: Store<fromAuth.AuthPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
