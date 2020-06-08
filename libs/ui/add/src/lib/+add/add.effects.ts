import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromAdd from './add.reducer';
import * as AddActions from './add.actions';
import { DrawGeometry } from '@slackmap/ui/map';
import { UiApiService } from '@slackmap/ui/api';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AddEffects {
  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddActions.save),
      switchMap(action => this.api.spotSave({spot: action.spot}).pipe(
        map(response => AddActions.saveSuccess({ response })),
        catchError(error => of(AddActions.saveFailure({ error }))),
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private api: UiApiService,
    ) {}
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
