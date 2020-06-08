import { createReducer, on, Action } from '@ngrx/store';
import * as MapActions from './map.actions';
import { MapViewChangeData } from './map.models';

export const MAP_FEATURE_KEY = 'map';

export interface MapState {
  view: MapViewChangeData;
}

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: MapState;
}

export const initialState: MapState = {
  view: null,
};

const mapReducer = createReducer(
  initialState,

  on(MapActions.viewChange, (state, { view }) => ({ ...state, view })),

);

export function reducer(state: MapState | undefined, action: Action) {
  return mapReducer(state, action);
}
