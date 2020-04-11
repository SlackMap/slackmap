import { createReducer, on, Action } from '@ngrx/store';
import * as MapActions from './map.actions';
import { MapViewChangeData } from './map.models';
import { SportType, ItemSubtype } from '@slackmap/core';
import { SPOT_FEATURE_KEY, State as SpotsState } from '../+spot/spot.reducer';

export const MAP_FEATURE_KEY = 'map';

export interface State {
  view: MapViewChangeData;
  selected: any[]; // selected spots, map will focus on this and add it on the map
  sportsEnabled: SportType[]; // sports enabled to show on the map
  subtypesEnabled: ItemSubtype[]; // only show this subtypes, if empty then show all
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: State;
  readonly [SPOT_FEATURE_KEY]: SpotsState;
}

export const initialState: State = {
  view: null,
  selected: [],
  sportsEnabled: [],
  subtypesEnabled: [],
};

const mapReducer = createReducer(
  initialState,

  on(MapActions.viewChange, (state, { view }) => ({ ...state, view })),

  on(MapActions.sportsEnabledChange, (state, { sportsEnabled }) => ({
    ...state,
    sportsEnabled,
  })),

  on(MapActions.subtypesEnabledChange, (state, { subtypesEnabled }) => ({
    ...state,
    subtypesEnabled: subtypesEnabled,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return mapReducer(state, action);
}
