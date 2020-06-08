import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromCore from './core.reducer';
import * as CoreSelectors from './core.selectors';
import * as CoreActions from './core.actions';
import { SportType } from '@slackmap/core';

@Injectable()
export class CoreFacade {
  actions = CoreActions;
  version$ = this.store.pipe(select(CoreSelectors.getCoreVersion));

  sportsEnabled$ = this.store.select(CoreSelectors.getCoreSportsEnabled);
  subtypesEnabled$ = this.store.select(CoreSelectors.getCoreSubtypesEnabled);

  constructor(private store: Store<fromCore.CorePartialState>) {}

  getSportFilteredSpots = (sport: SportType) => this.store.select(CoreSelectors.getMapSportFilteredSpots(sport));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
