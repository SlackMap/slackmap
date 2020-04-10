import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCore from './core.reducer';
import * as CoreSelectors from './core.selectors';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreFacade {
  actions = CoreActions;
  version$ = this.store.pipe(select(CoreSelectors.getCoreVersion));

  constructor(private store: Store<fromCore.CorePartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
