import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { EMPTY, of, from } from 'rxjs';
import * as mapActions from './map.actions';
import * as spotsActions from '../spot/spot.actions';
import { SpotsService } from '../../services';
import { MAP_ZOOM_THRESHOLD } from '@slackmap/core/api';
import { arrayDiff, ArrayDiff } from '@slackmap/ui-common';
import { LayerType } from '@slackmap/core';



@Injectable()
export class MapEffects {

  constructor(
    private actions$: Actions<mapActions.MapActions>,
    private spotsService: SpotsService
  ) {}


  /**
   * hash changes
   * fires event when you can have canges info
   */
  @Effect()
  viewHashChanges$ = this.actions$.pipe(
    ofType(mapActions.MapActionTypes.MAP_VIEW_CHANGE),
    map((action) => {
      return action.payload.zoom <   MAP_ZOOM_THRESHOLD ? [] : action.payload.hashes;
    }),
    distinctUntilChanged((prev: string[], next: string[]) => {
      return prev.join(',') === next.join(',');
    }),
    arrayDiff<string>(),
    map((diff: ArrayDiff<string>) => new mapActions.MapViewHashesChangeAction(diff))
  );

  /**
   * fire HASH_LOAD events for hashes witch enter the view
   * fire HASH_CLEAR events for hashes witch leave the view
   */
  @Effect()
  hashLoad$ = this.actions$.pipe(
    ofType(mapActions.MapActionTypes.MAP_VIEW_HASHES_CHANGE),
    mergeMap((action: mapActions.MapViewHashesChangeAction) => {
      const enters = action.payload.enter.map(hash => {
        return new spotsActions.HashLoadAction({
          layer: LayerType.SLACKLINE,
          hash
        });
      });

      const exits = action.payload.exit.map(hash => {
        return new spotsActions.HashClearAction({
          layer: LayerType.SLACKLINE,
          hash
        });
      });

      return from([
        ...exits,
        ...enters
      ]);
    })
  );

  /**
   * load clusters for zoom < MAP_ZOOM_THRESHOLD
   */
  @Effect()
  clusters$ = this.actions$.pipe(
    ofType(mapActions.MapActionTypes.MAP_VIEW_CHANGE),
    switchMap((action: mapActions.MapViewChangeAction) => {

      if (action.payload.zoom < MAP_ZOOM_THRESHOLD) {
        return this.spotsService.getClusters(LayerType.SLACKLINE, action.payload.bbox, action.payload.zoom).pipe(
          map(data => {
            return new spotsActions.HashRequestSuccessAction(data);
          })
        );
      } else {
        return <any>of(new spotsActions.HashClearAction({
          layer: LayerType.SLACKLINE,
          hash: 'clusters'
        }));
      }
    })
  );

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


}
