import { createReducer, on, Action } from '@ngrx/store';

import * as AddActions from './add.actions';
import { SportType, ItemType, ItemSubtype, AccessType, StatusType, SpotSubtype } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';
import { SpotModel } from '@slackmap/api/spot/dto';

export const ADD_FEATURE_KEY = 'add';

export interface AddState {
  sportType: SportType;
  drawType: DrawType;
  spot: SpotModel; // read only spot model for edit
  data: SpotModel; // edited spot model from the form
}

export interface AddPartialState {
  readonly [ADD_FEATURE_KEY]: AddState;
}

export const addInitialState: AddState = {
  sportType: null,
  drawType: null,
  spot: null,
  data: null,
};
// addInitialState.spot = {
//   access: AccessType.OPEN,
//   status: StatusType.ACTIVE,
// } as Partial<SpotModel> as SpotModel;
// addInitialState.spot.geometry = {
//   "type": "LineString",
//   "coordinates": [
//     [
//       20.848274,
//       52.33492
//     ],
//     [
//       20.858917,
//       52.329045
//     ]
//   ]
// }
// addInitialState.spot.geometry = {
//   type: 'Polygon',
//   coordinates: [
//     [
//       [
//         20.810852,
//         52.334815
//       ],
//       [
//         20.811796,
//         52.33193
//       ],
//       [
//         20.821323,
//         52.333608
//       ],
//       [
//         20.810852,
//         52.334815
//       ]
//     ]
//   ]
// }

const addReducer = createReducer(
  addInitialState,
  on(AddActions.setSport, (state, { sportType }) => ({ ...addInitialState, sportType })),
  on(AddActions.setDrawType, (state, { drawType }) => ({ ...addInitialState, sportType: state.sportType, drawType })),
  on(AddActions.setSpot, (state, { spot }) => ({ ...state, spot })),
  on(AddActions.setData, (state, { data }) => ({ ...state, data })),
  on(AddActions.resetData, (state) => ({ ...state, data: null })),
  on(AddActions.saveSuccess, (state) => ({ ...state, data: null })),
);

export function reducer(state: AddState | undefined, action: Action) {
  return addReducer(state, action);
}
