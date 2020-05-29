import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromAdd from './add.reducer';
import * as AddSelectors from './add.selectors';

@Injectable()
export class AddFacade {
  loaded$ = this.store.pipe(select(AddSelectors.getAddLoaded));
  allAdd$ = this.store.pipe(select(AddSelectors.getAllAdd));
  selectedAdd$ = this.store.pipe(select(AddSelectors.getSelected));

  constructor(private store: Store<fromAdd.AddPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
