import { createReducer, on, Action } from '@ngrx/store';
import * as CoreActions from './core.actions';
import { SportType, ItemSubtype } from '@slackmap/core';
import { MapFeature } from '@slackmap/ui/map';
import * as SpotFeature from '../+spot/spot.reducer';

export const CORE_FEATURE_KEY = 'core';

export interface CoreState {
  version: string;
  selected: any[]; // selected spots, map will focus on this and add it on the map
  sportsEnabled: SportType[]; // sports enabled to show on the map
  subtypesEnabled: ItemSubtype[]; // only show this subtypes, if empty then show all
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: CoreState;
  readonly [MapFeature.MAP_FEATURE_KEY]: MapFeature.MapState;
  readonly [SpotFeature.SPOT_FEATURE_KEY]: SpotFeature.SpotState;
}

export const initialState: CoreState = {
  version: '0.0.0',
  selected: [],
  sportsEnabled: [],
  subtypesEnabled: [],
};

const coreReducer = createReducer(
  initialState,
  on(CoreActions.version, (state, { version }) => ({ ...state, version })),

  on(CoreActions.sportsEnabledChange, (state, { sportsEnabled }) => ({
    ...state,
    sportsEnabled,
  })),

  on(CoreActions.subtypesEnabledChange, (state, { subtypesEnabled }) => ({
    ...state,
    subtypesEnabled: subtypesEnabled,
  })),
);

export function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}
