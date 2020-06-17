import { createReducer, on, Action } from '@ngrx/store';

import * as ConfigActions from './config.actions';
import { ConfigModel } from './config.models';

export const CONFIG_FEATURE_KEY = 'config';

export interface ConfigState {
  version: string;
  config: ConfigModel;
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: ConfigState;
}

export const initialState: ConfigState = {
  version: '0.0.0-dev',
  config: null,
};

const configReducer = createReducer(
  initialState,
  on(ConfigActions.version, (state, { version }) => ({ ...state, version })),

  on(ConfigActions.loadConfigSuccess, (state, { config }) => ({
    ...state,
    config,
  })),
);

export function reducer(state: ConfigState | undefined, action: Action) {
  return configReducer(state, action);
}
