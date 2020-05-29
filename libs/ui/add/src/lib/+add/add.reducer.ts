import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AddActions from './add.actions';
import { AddEntity } from './add.models';

export const ADD_FEATURE_KEY = 'add';

export interface State extends EntityState<AddEntity> {
  selectedId?: string | number; // which Add record has been selected
  loaded: boolean; // has the Add list been loaded
  error?: string | null; // last none error (if any)
}

export interface AddPartialState {
  readonly [ADD_FEATURE_KEY]: State;
}

export const addAdapter: EntityAdapter<AddEntity> = createEntityAdapter<
  AddEntity
>();

export const initialState: State = addAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const addReducer = createReducer(
  initialState,
  on(AddActions.loadAdd, (state) => ({ ...state, loaded: false, error: null })),
  on(AddActions.loadAddSuccess, (state, { add }) =>
    addAdapter.addAll(add, { ...state, loaded: true })
  ),
  on(AddActions.loadAddFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return addReducer(state, action);
}
