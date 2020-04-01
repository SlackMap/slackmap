import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSpot from './spot.reducer';
import * as SpotSelectors from './spot.selectors';

@Injectable()
export class SpotFacade {

  layers$ = this.store.pipe(select(SpotSelectors.getSpotLayers));

  constructor(private store: Store<fromSpot.SpotPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
