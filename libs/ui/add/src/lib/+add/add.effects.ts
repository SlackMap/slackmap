import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { fetch } from '@nrwl/angular';

import * as fromAdd from './add.reducer';
import * as AddActions from './add.actions';
import { DrawGeometry } from '@slackmap/ui/map';
import { UiApiService } from '@slackmap/ui/api';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { of, EMPTY, from } from 'rxjs';
import { ErrorService } from '@slackmap/ui/common/errors';
import { SpotService, SpotsActions } from '@slackmap/ui/spot';
import { CoreActions, MergedRoute, CoreFacade } from '@slackmap/ui/core';
import { AddRouteParams } from './add.models';
import { getSportOptionByName, SportType, DrawType } from '@slackmap/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AddEffects {

  router$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(action => action.payload.routerState.url.indexOf('/add') === 0),
      map(action => action.payload.routerState as unknown as MergedRoute<AddRouteParams>),
      switchMap(route => {

        let sportType: SportType = null;
        let drawType: DrawType = null;

        // validate drawType route param if they are valid enum values
        if (route.params.drawType) {
          if (Object.values(DrawType).includes(route.params.drawType)) {
            drawType = route.params.drawType;
          } else {
            const url = route.url.split('/');
            url.pop();
            this.router.navigate([url.join('/')]);
            return EMPTY;
          }
        }

        // validate sport name and convert to
        if(route.params.sportName) {
          const sportOption = getSportOptionByName(route.params.sportName);
          if (sportOption) {
            sportType = sportOption.id;
          } else {
            const url = route.url.split('/');
            this.router.navigate(['/' + url[1]]);
            return EMPTY;
          }
        }

        // if draw type selected we should show map when for handset devices
        const showMap = drawType ? true : false;

        return from([
          CoreActions.showMap({ showMap }),
          AddActions.setSport({sportType: sportType}),
          AddActions.setDrawType({drawType: drawType}),
        ]);
      }),
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddActions.save),
      withLatestFrom(this.coreFacade.route$),
      switchMap(([action, route]) => this.api.spotSave({ spot: action.spot }).pipe(
        switchMap(response => {
          this.spotService.reloadSupercluster();
          const url = (route || {url:'/add'}).url.split('/');
          url.pop();
          this.router.navigate([url.join('/')]);
          return from([
            SpotsActions.hashLoad({hash: action.spot.geohash, layer: action.spot.sport}),
            AddActions.saveSuccess({ response }),
          ]);
        }),
        catchError(response => {
          this.errorService.show({ error: response.error })
          return of(AddActions.saveFailure({ error: response.error }));
        }),
      ))
    )
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
    private api: UiApiService,
    private errorService: ErrorService,
    private spotService: SpotService,
    private coreFacade: CoreFacade,
  ) { }
}
const geometryLine: DrawGeometry = {
  "type": "LineString",
  "coordinates": [
    [
      20.910416,
      52.321281
    ],
    [
      20.930672,
      52.30365
    ]
  ]
};
const geometryPolygon: DrawGeometry = {
  "type": "Polygon",
  "coordinates": [
    [
      [
        20.898743,
        52.315195
      ],
      [
        20.902863,
        52.294622
      ],
      [
        20.955048,
        52.294832
      ],
      [
        20.947838,
        52.32254
      ],
      [
        20.898743,
        52.315195
      ]
    ]
  ]
};
