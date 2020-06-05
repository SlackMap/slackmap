import { createReducer, on, Action } from '@ngrx/store';

import * as AddActions from './add.actions';
import { SportType, ItemType, ItemSubtype } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';
import { SpotModel } from '@slackmap/api/spot/dto';

export const ADD_FEATURE_KEY = 'add';

export interface AddState {
  sport: SportType;
  drawType: DrawType;
  drawData: DrawData;
  spot: SpotModel; // read only spot model for edit
  spotData: Partial<SpotModel>; // edited spot model from the form
}

export interface AddPartialState {
  readonly [ADD_FEATURE_KEY]: AddState;
}

export const initialState: AddState = {
  sport: SportType.SLACKLINE,
  drawType: null,
  drawData: null,
  spot: null,
  spotData: null,
};
initialState.drawType = DrawType.LINE;
initialState.spot = {
  subtype: ItemSubtype.SPOT_HIGHLINE,
  length: 100
} as any;

const addReducer = createReducer(
  initialState,
  on(AddActions.reset, (state) => ({ ...initialState, sport: null })),
  on(AddActions.setSport, (state, { sport }) => ({ ...state, sport })),
  on(AddActions.setSpot, (state, { spot }) => ({ ...state, spot })),
  on(AddActions.setSpotData, (state, { spotData }) => ({ ...state, spotData })),
  on(AddActions.setDrawType, (state, { drawType }) => ({ ...state, drawType })),
  on(AddActions.setDrawData, (state, { drawData }) => ({ ...state, drawData })),
);

export function reducer(state: AddState | undefined, action: Action) {
  return addReducer(state, action);
}
