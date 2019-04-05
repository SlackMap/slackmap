import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { MapPartialState } from './map.reducer';
import * as selectors from './map.selectors';
import * as actions from './map.actions';

@Injectable()
export class MapFacade {
  loaded$ = this.store.pipe(select(selectors.getLoaded));

  constructor(private store: Store<MapPartialState>) {}

  loadAll() {
    this.store.dispatch(new actions.LoadMaps());
  }
}
