import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSpot from './spot.reducer';
import * as SpotSelectors from './spot.selectors';
import { SportType } from '@slackmap/core';

@Injectable()
export class SpotFacade {

  layers$ = this.store.pipe(select(SpotSelectors.getSpotLayers));

  sportsEnabled$ = this.store.select(SpotSelectors.getCoreSportsEnabled);
  subtypesEnabled$ = this.store.select(SpotSelectors.getCoreSubtypesEnabled);

  constructor(private store: Store<fromSpot.SpotPartialState>) {}

  getSportFilteredSpots = (sport: SportType) => this.store.select(SpotSelectors.getMapSportFilteredSpots(sport));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
