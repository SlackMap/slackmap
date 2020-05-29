import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromConfig from './config.reducer';
import * as ConfigSelectors from './config.selectors';

@Injectable()
export class ConfigFacade {
  loaded$ = this.store.pipe(select(ConfigSelectors.getConfigLoaded));
  allConfig$ = this.store.pipe(select(ConfigSelectors.getAllConfig));
  selectedConfig$ = this.store.pipe(select(ConfigSelectors.getSelected));

  constructor(private store: Store<fromConfig.ConfigPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
