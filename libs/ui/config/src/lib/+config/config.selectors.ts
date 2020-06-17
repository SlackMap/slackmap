import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONFIG_FEATURE_KEY,
  ConfigState,
  ConfigPartialState,
} from './config.reducer';

export const getConfigState = createFeatureSelector<ConfigPartialState, ConfigState>(
  CONFIG_FEATURE_KEY
);

export const getConfigVersion = createSelector(getConfigState, state => state.version);

export const getConfigConfig = createSelector(getConfigState, state => state.config);

