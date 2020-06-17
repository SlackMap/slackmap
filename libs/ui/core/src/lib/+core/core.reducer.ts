import { createReducer, on, Action } from '@ngrx/store';
import * as CoreActions from './core.actions';
import { SportType, ItemSubtype } from '@slackmap/core';
import { MapFeature } from '@slackmap/ui/map';

export const CORE_FEATURE_KEY = 'core';

export interface CoreState {

}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: CoreState;
  readonly [MapFeature.MAP_FEATURE_KEY]: MapFeature.MapState;
}

export const initialState: CoreState = {
  version: '0.0.0',

};

const coreReducer = createReducer(
  initialState,

);

export function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}
