import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import * as fromAdd from './add.reducer';
import * as AddSelectors from './add.selectors';
import * as AddActions from './add.actions';

@Injectable()
export class AddFacade {
  addState$ = this.store.pipe(select(AddSelectors.getAddState));
  sport$ = this.store.pipe(select(AddSelectors.getSport));
  drawType$ = this.store.pipe(select(AddSelectors.getDrawType));
  drawData$ = this.store.pipe(select(AddSelectors.getDrawData));
  spot$ = this.store.pipe(select(AddSelectors.getSpot));
  spotData$ = this.store.pipe(select(AddSelectors.getSpotData));
  subtypeOptions$ = this.store.pipe(select(AddSelectors.getSubtypeOptions));

  constructor(private store: Store<fromAdd.AddPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
