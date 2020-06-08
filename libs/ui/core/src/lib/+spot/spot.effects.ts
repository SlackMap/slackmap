import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromSpot from './spot.reducer';
import * as SpotActions from './spot.actions';
import { SpotService } from '../services/spot.service';
import { map, mergeAll, filter, takeUntil, mergeMap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { MapActions } from '@slackmap/ui/map';
import { SportType, MAP_ZOOM_THRESHOLD } from '@slackmap/core';
import { arrayDiff, ArrayDiff } from '@slackmap/ui/common/utils';

@Injectable()
export class SpotEffects {

  constructor(
    private actions$: Actions,
    private spotService: SpotService
  ) { }
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


  /**
   * handle view change
   */
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
      map((diff: ArrayDiff<string>) => SpotActions.viewHashesChange({ data: diff }))
    )
  );

  /**
   * fire SpotActions.hashLoad events for hashes witch enter the view
   * fire SpotActions.hashClear events for hashes witch leave the view
   */
  hashLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotActions.viewHashesChange),
      mergeMap((action) => {
        const enters = action.data.enter.map(hash => {
          return SpotActions.hashLoad({
            layer: SportType.SLACKLINE,
            hash
          });
        });

        const exits = action.data.exit.map(hash => {
          return SpotActions.hashClear({
            layer: SportType.SLACKLINE,
            hash
          });
        });

        return from([
          ...exits,
          ...enters
        ]);
      })
    )
  )

  /**
   * load clusters for zoom < MAP_ZOOM_THRESHOLD
   */
  clusters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.viewChange),
      switchMap((action) => {

        if (action.view.zoom < MAP_ZOOM_THRESHOLD) {
          return this.spotService.getClusters(SportType.SLACKLINE, action.view.bbox, action.view.zoom).pipe(
            map(data => {
              return SpotActions.hashRequestSuccess({data});
            })
          );
        } else {
          return of(SpotActions.hashClear({
            layer: SportType.SLACKLINE,
            hash: 'clusters'
          }));
        }
      })
    )
  )

  getHashClearAction(hash: string) {
    return this.actions$.pipe(
      ofType(SpotActions.hashClear),
      filter((action) => {
        return action.hash === hash;
      })
    )
  }
}

