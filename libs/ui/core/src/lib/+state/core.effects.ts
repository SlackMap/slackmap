import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromCore from './core.reducer';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreEffects {
  loadCore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadCore),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CoreActions.loadCoreSuccess({ core: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CoreActions.loadCoreFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
