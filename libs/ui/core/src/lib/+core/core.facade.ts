import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCore from './core.reducer';
import * as CoreSelectors from './core.selectors';
import * as RouterSelectors from '../+router/router.selectors';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreFacade {

  isHandset$ = this.store.select(CoreSelectors.getIsHandset);
  route$ = this.store.select(RouterSelectors.getMergedRoute);
  showMap$ = this.store.select(CoreSelectors.getShowMap);
  sports$ = this.store.select(CoreSelectors.getSports);
  subtypes$ = this.store.select(CoreSelectors.getSubtypes);
  selectedSports$ = this.store.select(CoreSelectors.getSelectedSports);
  selectedSubtypes$ = this.store.select(CoreSelectors.getSelectedSubtypes);

  constructor(private store: Store<fromCore.CorePartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  showMapToggle() {
    this.dispatch(CoreActions.showMapToggle())
  }
  showMap(showMap: boolean) {
    this.dispatch(CoreActions.showMap({showMap}))
  }
}
