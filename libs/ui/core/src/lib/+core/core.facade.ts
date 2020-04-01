import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCore from './core.reducer';
import * as CoreSelectors from './core.selectors';

@Injectable()
export class CoreFacade {
  loaded$ = this.store.pipe(select(CoreSelectors.getCoreLoaded));
  allCore$ = this.store.pipe(select(CoreSelectors.getAllCore));
  selectedCore$ = this.store.pipe(select(CoreSelectors.getSelected));

  constructor(private store: Store<fromCore.CorePartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
