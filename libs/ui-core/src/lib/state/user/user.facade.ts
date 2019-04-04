import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { UserPartialState } from './user.reducer';
import { userQuery } from './user.selectors';
import { LoadUser } from './user.actions';

@Injectable()
export class UserFacade {
  loaded$ = this.store.pipe(select(userQuery.getLoaded));
  allUser$ = this.store.pipe(select(userQuery.getAllUser));
  selectedUser$ = this.store.pipe(select(userQuery.getSelectedUser));

  constructor(private store: Store<UserPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadUser());
  }
}
