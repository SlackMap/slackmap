import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromMap from './map.reducer';
import * as MapActions from './map.actions';
import { map, distinctUntilChanged, mergeMap, switchMap } from 'rxjs/operators';
import { arrayDiff, ArrayDiff } from '@slackmap/ui/common/utils';
import { from, of } from 'rxjs';
import { SportType } from '@slackmap/core';

@Injectable()
export class MapEffects {

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
    ) { }
}
