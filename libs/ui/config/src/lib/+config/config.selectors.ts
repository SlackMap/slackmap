import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONFIG_FEATURE_KEY,
  State,
  ConfigPartialState,
  configAdapter,
} from './config.reducer';

// Lookup the 'Config' feature state managed by NgRx
export const getConfigState = createFeatureSelector<ConfigPartialState, State>(
  CONFIG_FEATURE_KEY
);

const { selectAll, selectEntities } = configAdapter.getSelectors();

export const getConfigLoaded = createSelector(
  getConfigState,
  (state: State) => state.loaded
);

export const getConfigError = createSelector(
  getConfigState,
  (state: State) => state.error
);

export const getAllConfig = createSelector(getConfigState, (state: State) =>
  selectAll(state)
);

export const getConfigEntities = createSelector(
  getConfigState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getConfigState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getConfigEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
