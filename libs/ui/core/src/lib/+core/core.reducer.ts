import { createReducer, on, Action } from '@ngrx/store';
import * as CoreActions from './core.actions';

export const CORE_FEATURE_KEY = 'core';

export interface State {
  version: string
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: State;
}

export const initialState: State = {
  version: '0.0.0'
};

const coreReducer = createReducer(
  initialState,
  on(CoreActions.version, (state, { version }) => ({ ...state, version }))
);

export function reducer(state: State | undefined, action: Action) {
  return coreReducer(state, action);
}
