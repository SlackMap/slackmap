import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ConfigActions from './config.actions';
import { ConfigEntity } from './config.models';

export const CONFIG_FEATURE_KEY = 'config';

export interface State extends EntityState<ConfigEntity> {
  selectedId?: string | number; // which Config record has been selected
  loaded: boolean; // has the Config list been loaded
  error?: string | null; // last none error (if any)
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: State;
}

export const configAdapter: EntityAdapter<ConfigEntity> = createEntityAdapter<
  ConfigEntity
>();

export const initialState: State = configAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const configReducer = createReducer(
  initialState,
  on(ConfigActions.loadConfig, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ConfigActions.loadConfigSuccess, (state, { config }) =>
    configAdapter.addAll(config, { ...state, loaded: true })
  ),
  on(ConfigActions.loadConfigFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
