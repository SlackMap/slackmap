import { createReducer, on, Action } from '@ngrx/store';
import * as CoreActions from './core.actions';
import { SportType, ItemSubtype } from '@slackmap/core';
import { MapFeature } from '@slackmap/ui/map';

export const CORE_FEATURE_KEY = 'core';

export interface CoreState {
  isHandset: boolean;
  showMap: boolean;
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: CoreState;
  readonly [MapFeature.MAP_FEATURE_KEY]: MapFeature.MapState;
}

export const initialState: CoreState = {
  isHandset: false,
  showMap: false,
};

const coreReducer = createReducer(
  initialState,

  on(CoreActions.isHandset, (state, { isHandset }) => ({ ...state, isHandset })),
  on(CoreActions.showMap, (state, { showMap }) => ({ ...state, showMap })),
  on(CoreActions.showMapToggle, (state) => ({ ...state, showMap: !state.showMap })),
);

export function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}
