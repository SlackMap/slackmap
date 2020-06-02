import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import * as fromAdd from './add.reducer';
import * as AddSelectors from './add.selectors';
import * as AddActions from './add.actions';

@Injectable()
export class AddFacade {
  sport$ = this.store.pipe(select(AddSelectors.getSport));
  drawType$ = this.store.pipe(select(AddSelectors.getDrawType));
  drawData$ = this.store.pipe(select(AddSelectors.getDrawData));

  constructor(private store: Store<fromAdd.AddPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
