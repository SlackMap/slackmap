import { createReducer, on, Action } from '@ngrx/store';

import * as AddActions from './add.actions';
import { SportType, ItemType } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';

export const ADD_FEATURE_KEY = 'add';

export interface AddState {
  sport: SportType;
  drawType: DrawType;
  drawData: DrawData;
}

export interface AddPartialState {
  readonly [ADD_FEATURE_KEY]: AddState;
}

export const initialState: AddState = {
  sport: SportType.SLACKLINE,
  drawType: null,
  drawData: null,
};

const addReducer = createReducer(
  initialState,
  on(AddActions.reset, (state) => ({ ...initialState, sport: null })),
  on(AddActions.setSport, (state, { sport }) => ({ ...state, sport })),
  on(AddActions.setDrawType, (state, { drawType }) => ({ ...state, drawType })),
  on(AddActions.setDrawData, (state, { drawData }) => ({ ...state, drawData })),
);

export function reducer(state: AddState | undefined, action: Action) {
  return addReducer(state, action);
}
