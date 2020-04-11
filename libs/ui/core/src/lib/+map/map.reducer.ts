import { createReducer, on, Action } from '@ngrx/store';
import * as MapActions from './map.actions';
import { MapViewChangeData } from './map.models';
import { SportType, ItemSubtype } from '@slackmap/core';
import { SPOT_FEATURE_KEY, State as SpotsState } from '../+spot/spot.reducer';

export const MAP_FEATURE_KEY = 'map';

export interface State {
  view: MapViewChangeData;
  selected: any[]; // selected spots, map will focus on this and add it on the map
  layersEnabled: SportType[]; // list of enabled layers
  layersSubtypeFilters: ItemSubtype[]; // filters for each layers
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: State;
  readonly [SPOT_FEATURE_KEY]: SpotsState;
}

export const initialState: State = {
  view: null,
  selected: [],
  layersEnabled: [],
  layersSubtypeFilters: [],
};

const mapReducer = createReducer(
  initialState,

  on(MapActions.viewChange, (state, { view }) => ({ ...state, view })),

  on(MapActions.layersEnabledChange, (state, { layersEnabled }) => ({
    ...state,
    layersEnabled,
  })),

  on(MapActions.layerSubtypeFiltersChange, (state, { subtypesEnabled }) => ({
    ...state,
    layersSubtypeFilters: subtypesEnabled,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return mapReducer(state, action);
}
