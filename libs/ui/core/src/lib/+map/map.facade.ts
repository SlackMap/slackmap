import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromMap from './map.reducer';
import * as MapSelectors from './map.selectors';
import { SportType } from '@slackmap/core';

@Injectable()
export class MapFacade {
  view$ = this.store.pipe(select(MapSelectors.getMapView));
  layerFilters$ = this.store.select(MapSelectors.getMapLayerFilters);

  constructor(private store: Store<fromMap.MapPartialState>) {}

  getFilters$ = (layer: SportType) => this.store.pipe(select(MapSelectors.getMapFilters(layer)));

  getLayerFilteredSpots = (layer: SportType) => this.store.select(MapSelectors.getMapLayerFilteredSpots(layer));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
