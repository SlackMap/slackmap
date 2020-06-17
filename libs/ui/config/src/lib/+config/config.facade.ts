import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromConfig from './config.reducer';
import * as ConfigSelectors from './config.selectors';

@Injectable()
export class ConfigFacade {
  version$ = this.store.pipe(select(ConfigSelectors.getConfigVersion));
  config$ = this.store.pipe(select(ConfigSelectors.getConfigConfig));

  constructor(private store: Store<fromConfig.ConfigPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
