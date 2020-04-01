import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromSpot from './spot.reducer';
import * as SpotActions from './spot.actions';
import { SpotService } from '../services/spot.service';
import { map, mergeAll, filter, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SpotEffects {
  loadHash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotActions.hashLoad),
      map((action) => {
        return this.spotService.loadSpotsByHash(action.layer, action.hash).pipe(
          map(data => SpotActions.hashRequestSuccess({ data })),
          takeUntil(this.getHashClearAction(action.hash))
        );
      }),
      mergeAll(4)
    )
  );

  getHashClearAction(hash: string) {
    return this.actions$.pipe(
      ofType(SpotActions.hashClear),
      filter((action) => {
        return action.hash === hash;
      })
    )
  }

  constructor(
    private actions$: Actions,
    private spotService: SpotService
  ) { }
}

