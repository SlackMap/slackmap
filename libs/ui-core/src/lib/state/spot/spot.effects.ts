import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeAll, filter, takeUntil } from 'rxjs/operators';
import { SpotActionTypes, SpotActions, HashLoadAction, HashClearAction, HashRequestSuccessAction } from './spot.actions';
import { SpotsService } from 'libs/ui-core/src/lib/services';


@Injectable()
export class SpotsEffects {

  /**
   * load spots for layer hash
   */
  @Effect()
  spots$ = this.actions$.pipe(
    ofType(SpotActionTypes.HASH_LOAD),
    map((action: HashLoadAction) => {
      return this.spotsService.loadSpotsByHash(action.payload.layer, action.payload.hash).pipe(
        map(data => new HashRequestSuccessAction(data)),
        takeUntil(this.actions$.pipe(
          ofType(SpotActionTypes.HASH_CLEAR),
          filter((clear: HashClearAction) => {
            return clear.payload.hash === action.payload.hash;
          })
        ))
      );
    }),
    mergeAll(4)
  );

  constructor(
    private actions$: Actions<SpotActions>,
    private spotsService: SpotsService
  ) {}
}
