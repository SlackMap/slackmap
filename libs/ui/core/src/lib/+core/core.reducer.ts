import { createReducer, on, Action } from '@ngrx/store';
import * as CoreActions from './core.actions';
import { SportType, ItemSubtype, SportOption, SubtypeOption, SPORT_OPTIONS, SUBTYPE_OPTIONS } from '@slackmap/core';
import { MapFeature } from '@slackmap/ui/map';

export const CORE_FEATURE_KEY = 'core';

export interface CorePartialStateForRoute {
  showMap: boolean;
  selectedSportIds: SportType[];
  selectedSubtypeIds: ItemSubtype[];
}

export interface CoreState extends CorePartialStateForRoute {
  isHandset: boolean;
  sports: SportOption[];
  subtypes: SubtypeOption[];
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: CoreState;
  readonly [MapFeature.MAP_FEATURE_KEY]: MapFeature.MapState;
}


export const initialState: CoreState = {
  isHandset: false,
  showMap: false,
  sports: SPORT_OPTIONS,
  subtypes: SUBTYPE_OPTIONS,
  selectedSportIds: [],
  selectedSubtypeIds: [],
};

const coreReducer = createReducer(
  initialState,

  on(CoreActions.isHandset, (state, { isHandset }) => ({ ...state, isHandset })),
  on(CoreActions.showMap, (state, { showMap }) => ({ ...state, showMap })),
  on(CoreActions.showMapToggle, (state) => ({ ...state, showMap: !state.showMap })),
  on(CoreActions.updateFromRoute, (state, action) => ({ ...state, ...action.state })),
);

export function reducer(state: CoreState | undefined, action: Action) {
  return coreReducer(state, action);
}
