import { createReducer, on, Action } from '@ngrx/store';
import * as MapActions from './map.actions';
import { MapViewChangeData } from './map.models';
import { LayerType } from '@slackmap/core';
import { SPOT_FEATURE_KEY, State as SpotsState } from '../+spot/spot.reducer';

export const MAP_FEATURE_KEY = 'map';

export interface State {
  view: MapViewChangeData;
  selected: any[]; // selected spots, map will focus on this and add it on the map
  layer_enabled: { [key in LayerType]: boolean }; // list of enabled layers
  layer_filters: { [key in LayerType]: string[] }; // filters for each layers
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: State;
  readonly [SPOT_FEATURE_KEY]: SpotsState;
}

export const initialState: State = {
  view: null,
  selected: [],
  layer_enabled: {
    [LayerType.SLACKLINE]: false,
    [LayerType.TRAMPOLINE]: false,
    [LayerType.DIVING]: false,
  },
  layer_filters: {
    [LayerType.SLACKLINE]: [],
    [LayerType.TRAMPOLINE]: [],
    [LayerType.DIVING]: [],
  },
};

const mapReducer = createReducer(
  initialState,

  on(MapActions.viewChange, (state, { view }) => ({ ...state, view })),

  on(MapActions.layerEnabledChange, (state, { layer, enabled }) => ({
    ...state,
    layer_enabled: {
      ...state.layer_enabled,
      [layer]: enabled,
    },
  })),

  on(MapActions.layerFiltersChange, (state, { layer, filters }) => ({
    ...state,
    layer_filters: {
      ...state.layer_filters,
      [layer]: filters,
    },
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return mapReducer(state, action);
}
