import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SpotActions from './spot.actions';
import { SportType } from '@slackmap/core';
import { LoadHashResponse } from './spot.models';

export const SPOT_FEATURE_KEY = 'spot';

export interface State  {
  layers: {[key in SportType]: {[key: string]: LoadHashResponse}}; // layers spots as hash of arrays, key is geohash
}

export interface SpotPartialState {
  readonly [SPOT_FEATURE_KEY]: State;
}

export const initialState: State = {
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
    const newState: State = {
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

export function reducer(state: State | undefined, action: Action) {
  return spotReducer(state, action);
}
