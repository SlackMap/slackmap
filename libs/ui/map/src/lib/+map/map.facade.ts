import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as fromMap from './map.reducer';
import * as MapSelectors from './map.selectors';
import * as MapActions from './map.actions';
import { SportType } from '@slackmap/core';

@Injectable()
export class MapFacade {
  actions = MapActions;
  view$ = this.store.pipe(select(MapSelectors.getMapView));

  constructor(private store: Store<fromMap.MapPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
