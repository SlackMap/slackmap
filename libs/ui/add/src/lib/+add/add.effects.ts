import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromAdd from './add.reducer';
import * as AddActions from './add.actions';
import { DrawGeometry } from '@slackmap/ui/map';

@Injectable()
export class AddEffects {
  // loadAdd$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AddActions.loadAdd),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return AddActions.loadAddSuccess({ add: [] });
  //       },

  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return AddActions.loadAddFailure({ error });
  //       },
  //     })
  //   )
  // );

  constructor(private actions$: Actions) {}
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
