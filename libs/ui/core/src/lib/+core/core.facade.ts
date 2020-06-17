import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCore from './core.reducer';
import * as CoreSelectors from './core.selectors';
import * as CoreActions from './core.actions';
import { SportType } from '@slackmap/core';

@Injectable()
export class CoreFacade {

  constructor(private store: Store<fromCore.CorePartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
