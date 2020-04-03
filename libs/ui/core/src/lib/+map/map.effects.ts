import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromMap from './map.reducer';
import * as MapActions from './map.actions';
import * as SpotActions from '../+spot/spot.actions';
import { map, distinctUntilChanged, mergeMap, switchMap } from 'rxjs/operators';
import { MAP_ZOOM_THRESHOLD } from '@slackmap/api-client';
import { arrayDiff, ArrayDiff } from '../utils';
import { from, of } from 'rxjs';
import { LayerType } from '@slackmap/core';
import { SpotService } from '../services/spot.service';

@Injectable()
export class MapEffects {

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
      map((diff: ArrayDiff<string>) => MapActions.viewHashesChange({ data: diff }))
    )
  );


  /**
   * fire SpotActions.hashLoad events for hashes witch enter the view
   * fire SpotActions.hashClear events for hashes witch leave the view
   */
  hashLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.viewHashesChange),
      mergeMap((action) => {
        const enters = action.data.enter.map(hash => {
          return SpotActions.hashLoad({
            layer: LayerType.SLACKLINE,
            hash
          });
        });

        const exits = action.data.exit.map(hash => {
          return SpotActions.hashClear({
            layer: LayerType.SLACKLINE,
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
          return this.spotService.getClusters(LayerType.SLACKLINE, action.view.bbox, action.view.zoom).pipe(
            map(data => {
              return SpotActions.hashRequestSuccess({data});
            })
          );
        } else {
          return of(SpotActions.hashClear({
            layer: LayerType.SLACKLINE,
            hash: 'clusters'
          }));
        }
      })
    )
  )

  /**
   * handle item clicks
   */
  // @Effect()
  // itemClicks$ = this.actions$.ofType(MapActionTypes.MAP_ITEM_CLICK).pipe(
  //   switchMap((action: mapActions.MapItemClickAction) => {
  //     const item = action.payload.item;
  //     if (item.type === ItemType.CLUSTER && !item.rid) {
  //       return of(new mapActions.MapZoomItemsAction([action.payload.item]))
  //     }

  //     if (item.rid) {
  //       const nav = this.app.getRootNav();
  //       const views = nav.getViews();

  //       nav.push('ItemPage', {
  //         rid: item.rid,
  //         item: item
  //       })
  //       console.log('VIEWS', views)
  //       if (views.length > 1) {
  //         if (views[views.length - 2].component.name === 'ItemPage') {
  //           nav.remove(views.length - 2)
  //         }
  //       }
  //     }
  //     return empty()
  //   })
  // );

  constructor(
    private actions$: Actions,
    private spotService: SpotService
    ) { }
}
