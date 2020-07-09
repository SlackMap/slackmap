import { createReducer, on, Action } from '@ngrx/store';
import * as SpotActions from './spot.actions';
import { SportType, ItemSubtype, ItemSubtypes } from '@slackmap/core';
import { LoadHashResponse } from './spot.models';
import { SpotGetDto } from '@slackmap/api/spot/dto';
import { CoreFeature } from '@slackmap/ui/core';
import { MapFeature } from '@slackmap/ui/map';

export const SPOT_FEATURE_KEY = 'spot';

export interface SpotState  {
  spot: SpotGetDto;
  layers: {[key in SportType]: {[key: string]: LoadHashResponse}}; // layers spots as hash of arrays, key is geohash
  selected: any[]; // selected spots, map will focus on this and add it on the map
}

export interface SpotPartialState {
  readonly [SPOT_FEATURE_KEY]: SpotState;
  readonly [CoreFeature.CORE_FEATURE_KEY]: CoreFeature.CoreState;
  readonly [MapFeature.MAP_FEATURE_KEY]: MapFeature.MapState;
}

export const initialState: SpotState = {
  spot: null,
  layers: {
    [SportType.SLACKLINE]: {},
    [SportType.TRAMPOLINE]: {},
    [SportType.DIVING]: {}
  },
  selected: [],
};

const spotReducer = createReducer(
  initialState,
  on(SpotActions.loadSuccess, (state, { spot }) => ({
    ...state,
    spot,
  })),
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
