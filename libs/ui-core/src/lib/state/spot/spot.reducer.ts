
import { SpotActions, SpotActionTypes } from './spot.actions';
import { LayerType } from '@slackmap/core';
import { LoadHashResponse } from '@slackmap/core/api';

export const SPOT_FEATURE_KEY = 'spot';

export interface SpotPartialState {
  readonly [SPOT_FEATURE_KEY]: SpotState
}


export interface SpotState {
  layer_spots: {[key in LayerType]: {[key: string]: LoadHashResponse}}; // layers spots as hash of arrays, key is geohash
}

export const initialState: SpotState = {

  layer_spots: {
    [LayerType.SLACKLINE]: {},
    [LayerType.TRAMPOLINE]: {},
    [LayerType.DIVING]: {}
  },
};

export function reducer(state = initialState, action: SpotActions): SpotState {
  switch (action.type) {

    case SpotActionTypes.HASH_STORAGE_SUCCESS:
    case SpotActionTypes.HASH_REQUEST_ERROR:
    case SpotActionTypes.HASH_REQUEST_SUCCESS: {
      return {
        ...state,
        layer_spots: {
          ...state.layer_spots,
          [action.payload.layer]: {
            ...state.layer_spots[action.payload.layer],
            [action.payload.hash]: action.payload
          }
        }
      };
    }
    case SpotActionTypes.HASH_LOADING: {
      return {
        ...state,
        layer_spots: {
          ...state.layer_spots,
          [action.payload.layer]: {
            ...state.layer_spots[action.payload.layer],
            [action.payload.hash]: {
              ...[state.layer_spots[action.payload.layer][action.payload.hash]],
              loading: action.payload.loading
            }
          }
        }
      };
    }
    case SpotActionTypes.HASH_CLEAR: {
      const newState = {
        ...state,
        layer_spots: {
          ...state.layer_spots,
          [action.payload.layer]: {
            ...state.layer_spots[action.payload.layer],
            [action.payload.hash]: null
          }
        }
      };
      delete newState.layer_spots[action.payload.layer][action.payload.hash];
      return newState;
    }


    default:
      return state;
  }
}
