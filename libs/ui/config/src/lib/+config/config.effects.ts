import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromConfig from './config.reducer';
import * as ConfigActions from './config.actions';

@Injectable()
export class ConfigEffects {
  // loadConfig$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ConfigActions.loadConfig),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return ConfigActions.loadConfigSuccess({ config: [] });
  //       },

  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return ConfigActions.loadConfigFailure({ error });
  //       },
  //     })
  //   )
  // );

  constructor(private actions$: Actions) {}
}
