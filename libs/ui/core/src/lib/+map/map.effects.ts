import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromMap from './map.reducer';
import * as MapActions from './map.actions';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { MAP_ZOOM_THRESHOLD } from '@slackmap/api-client';
import { arrayDiff, ArrayDiff } from '../utils';

@Injectable()
export class MapEffects {

  viewChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.viewChange),
      map((action) => {
        return action.view.zoom < MAP_ZOOM_THRESHOLD ? [] : action.view.hashes;
      }),
      distinctUntilChanged((prev: string[], next: string[]) => {
        return prev.join(',') === next.join(',');
      }),
      arrayDiff<string>(),
      map((diff: ArrayDiff<string>) => MapActions.viewHashesChange({ data: diff }))
    )
  );

  constructor(private actions$: Actions) { }
}
