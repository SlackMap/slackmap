import { createReducer, on, Action } from '@ngrx/store';
import * as SpotActions from './spot.actions';
import { SportType } from '@slackmap/core';
import { LoadHashResponse } from './spot.models';

export const SPOT_FEATURE_KEY = 'spot';

export interface SpotState  {
  layers: {[key in SportType]: {[key: string]: LoadHashResponse}}; // layers spots as hash of arrays, key is geohash
}

export interface SpotPartialState {
  readonly [SPOT_FEATURE_KEY]: SpotState;
}

export const initialState: SpotState = {
  layers: {
    [SportType.SLACKLINE]: {},
    [SportType.TRAMPOLINE]: {},
    [SportType.DIVING]: {}
  },
};

const spotReducer = createReducer(
  initialState,
  on(SpotActions.hashStorageSuccess, SpotActions.hashRequestFailure, SpotActions.hashRequestSuccess, (state, action) => ({
    ...state,
    layers: {
      ...state.layers,
      [action.data.layer]: {
        ...state.layers[action.data.layer],
        [action.data.hash]: action.data
      }
    }
  })),
  on(SpotActions.hashLoading, (state, action) => ({
    ...state,
    layers: {
      ...state.layers,
      [action.layer]: {
        ...state.layers[action.layer],
        [action.hash]: {
          ...[state.layers[action.layer][action.hash]],
          loading: action.loading
        }
      }
    }
  })),
  on(SpotActions.hashClear, (state, action) => {
    const newState: SpotState = {
      ...state,
      layers: {
        ...state.layers,
        [action.layer]: {
          ...state.layers[action.layer],
          [action.hash]: null
        }
      }
    };
    delete newState.layers[action.layer][action.hash];
    return newState;
  }),
);

export function reducer(state: SpotState | undefined, action: Action) {
  return spotReducer(state, action);
}
