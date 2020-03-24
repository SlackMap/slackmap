import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CoreActions from './core.actions';
import { CoreEntity } from './core.models';

export const CORE_FEATURE_KEY = 'core';

export interface State extends EntityState<CoreEntity> {
  selectedId?: string | number; // which Core record has been selected
  loaded: boolean; // has the Core list been loaded
  error?: string | null; // last none error (if any)
}

export interface CorePartialState {
  readonly [CORE_FEATURE_KEY]: State;
}

export const coreAdapter: EntityAdapter<CoreEntity> = createEntityAdapter<
  CoreEntity
>();

export const initialState: State = coreAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const coreReducer = createReducer(
  initialState,
  on(CoreActions.loadCore, state => ({ ...state, loaded: false, error: null })),
  on(CoreActions.loadCoreSuccess, (state, { core }) =>
    coreAdapter.addAll(core, { ...state, loaded: true })
  ),
  on(CoreActions.loadCoreFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return coreReducer(state, action);
}
