import { createReducer, on, Action } from '@ngrx/store';

import * as AddActions from './add.actions';
import { SportType, ItemType, ItemSubtype, AccessType, StatusType } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';
import { SpotModel } from '@slackmap/api/spot/dto';

export const ADD_FEATURE_KEY = 'add';

export interface AddState {
  sport: SportType;
  drawType: DrawType;
  drawData: DrawData;
  spot: Partial<SpotModel>; // read only spot model for edit
  spotData: Partial<SpotModel>; // edited spot model from the form
}

export interface AddPartialState {
  readonly [ADD_FEATURE_KEY]: AddState;
}

export const addInitialState: AddState = {
  sport: SportType.SLACKLINE,
  drawType: null,
  drawData: null,
  spot: {
    access: AccessType.OPEN,
    status: StatusType.ACTIVE,
  },
  spotData: null,
};
addInitialState.drawType = DrawType.LINE;
// initialState.spot.subtype = ItemSubtype.SPOT_HIGHLINE;
addInitialState.spot.length = 100;
addInitialState.spot.geometry = {
  "type": "LineString",
  "coordinates": [
    [
      20.848274,
      52.33492
    ],
    [
      20.858917,
      52.329045
    ]
  ]
}

const addReducer = createReducer(
  addInitialState,
  on(AddActions.reset, (state) => ({ ...addInitialState, sport: null })),
  on(AddActions.setSport, (state, { sport }) => ({ ...state, sport })),
  on(AddActions.setSpot, (state, { spot }) => ({ ...state, spot })),
  on(AddActions.setSpotData, (state, { spotData }) => ({ ...state, spotData })),
  on(AddActions.setDrawType, (state, { drawType }) => ({ ...state, drawType })),
  on(AddActions.setDrawData, (state, { drawData }) => ({ ...state, drawData })),
);

export function reducer(state: AddState | undefined, action: Action) {
  return addReducer(state, action);
}
