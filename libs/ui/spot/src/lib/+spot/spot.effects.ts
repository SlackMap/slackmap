import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromSpot from './spot.reducer';
import * as SpotActions from './spot.actions';
import { map, mergeAll, filter, takeUntil, mergeMap, switchMap, distinctUntilChanged, catchError } from 'rxjs/operators';
import { of, from, EMPTY } from 'rxjs';
import { MapActions, MapService } from '@slackmap/ui/map';
import { SportType, MAP_ZOOM_THRESHOLD, ItemType, DrawType, getSportOptionByName } from '@slackmap/core';
import { arrayDiff, ArrayDiff } from '@slackmap/ui/common/utils';
import { SpotService } from '../services';
import { Router } from '@angular/router';
import { ClusterModel } from '@slackmap/api/clusters/dto';
import { routerNavigatedAction } from '@ngrx/router-store';
import { MergedRoute, CoreActions } from '@slackmap/ui/core';
import { SpotRouteParams } from './spot.models';
import { UiApiService } from '@slackmap/ui/api';

@Injectable()
export class SpotEffects {

  constructor(
    private actions$: Actions,
    private spotService: SpotService,
    private mapService: MapService,
    private router: Router,
    private api: UiApiService,
  ) { }

  router$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(action => action.payload.routerState.url.indexOf('/x') === 0),
      map(action => action.payload.routerState as unknown as MergedRoute<SpotRouteParams>),
      map(route => route.params.rid),
      filter(rid => !!rid),
      map(rid => SpotActions.load({rid}))
    )
  );

  spotLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotActions.load),
      switchMap(action => {
        return this.api.spotGet(action.rid).pipe(
          switchMap(spot => from([
            SpotActions.loadSuccess({spot}),
            CoreActions.setSport({sport: spot?.spot?.sport})
          ])),
          catchError(error => of(SpotActions.loadFailure({error})))
        );
      }),
    )
  );

  spotClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpotActions.spotClick),
      map(action => action.spot),
      filter(spot => !!spot),
      map((spot) => {
         if(spot.rid) {
          this.router.navigate(['/x', spot.rid])
        } else if(spot.type === ItemType.CLUSTER) {
          const s = spot as ClusterModel;
          this.mapService.setView({
            position: s.position,
            zoom: s.expansionZoom,
          })
        }
      }),
    ),
    {dispatch: false}
  );

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

