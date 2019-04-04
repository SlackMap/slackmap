import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { UserPartialState } from './user.reducer';
import {
  LoadUser,
  UserLoaded,
  UserLoadError,
  UserActionTypes,
} from './user.actions';

@Injectable()
export class UserEffects {
  @Effect() loadUser$ = this.dataPersistence.fetch(UserActionTypes.LoadUser, {
    run: (action: LoadUser, state: UserPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new UserLoaded([]);
    },

    onError: (action: LoadUser, error) => {
      console.error('Error', error);
      return new UserLoadError(error);
    },
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<UserPartialState>,
  ) {}
}
