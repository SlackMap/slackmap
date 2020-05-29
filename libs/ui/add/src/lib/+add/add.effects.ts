import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromAdd from './add.reducer';
import * as AddActions from './add.actions';

@Injectable()
export class AddEffects {
  loadAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddActions.loadAdd),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AddActions.loadAddSuccess({ add: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AddActions.loadAddFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
