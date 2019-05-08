import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { MapPartialState } from './map.reducer';
import * as selectors from './map.selectors';
import * as actions from './map.actions';
import { LayerType } from '@slackmap/core';

@Injectable()
export class MapFacade {

  selectMapLayerFilters$ = this.store.select(selectors.selectMapLayerFilters);

  constructor(private store: Store<MapPartialState>) {}

  selectMapLayerFilteredSpots(layer: LayerType) {
    return this.store.select(selectors.selectMapLayerFilteredSpots(LayerType.SLACKLINE));
  }

  viewChange(data) {
    this.store.dispatch(new actions.MapViewChangeAction(data));
  }
  itemClick(data) {
    this.store.dispatch(new actions.MapItemClickAction(data));
  }

  layerFiltersChange(data) {
    this.store.dispatch(new actions.MapLayerFiltersChangeAction(data));
  }
}
