import { MapActions, MapActionTypes } from './map.actions';
import { LayerType } from '@slackmap/core';
import { MapViewChangeData } from '@slackmap/core/api';

export const MAP_FEATURE_KEY = 'map';

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: MapState;
}

export interface MapState {
  view: MapViewChangeData;
  selected: any[]; // selected spots, map will focus on this and add it on the map
  layer_enabled: { [key in LayerType]: boolean }; // list of enabled layers
  layer_filters: { [key in LayerType]: string[] }; // filters for each layers
}

export const initialState: MapState = {
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

export function reducer(
  state: MapState = initialState,
  action: MapActions,
): MapState {
  switch (action.type) {
    case MapActionTypes.MAP_VIEW_CHANGE:
      return {
        ...state,
        view: action.payload,
      };
    case MapActionTypes.MAP_LAYER_ENABLED_CHANGE:
      return {
        ...state,
        layer_enabled: {
          ...state.layer_enabled,
          [action.payload.layer]: action.payload.enabled,
        },
      };
    case MapActionTypes.MAP_LAYER_FILTERS_CHANGE:
      return {
        ...state,
        layer_filters: {
          ...state.layer_filters,
          [action.payload.layer]: action.payload.filters,
        },
      };
    default:
      return state;
  }
}
