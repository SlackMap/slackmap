import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CORE_FEATURE_KEY,
  State,
  CorePartialState,
  coreAdapter
} from './core.reducer';

// Lookup the 'Core' feature state managed by NgRx
export const getCoreState = createFeatureSelector<CorePartialState, State>(
  CORE_FEATURE_KEY
);

const { selectAll, selectEntities } = coreAdapter.getSelectors();

export const getCoreLoaded = createSelector(
  getCoreState,
  (state: State) => state.loaded
);

export const getCoreError = createSelector(
  getCoreState,
  (state: State) => state.error
);

export const getAllCore = createSelector(getCoreState, (state: State) =>
  selectAll(state)
);

export const getCoreEntities = createSelector(getCoreState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getCoreState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCoreEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
