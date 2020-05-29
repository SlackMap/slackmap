import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ADD_FEATURE_KEY,
  State,
  AddPartialState,
  addAdapter,
} from './add.reducer';

// Lookup the 'Add' feature state managed by NgRx
export const getAddState = createFeatureSelector<AddPartialState, State>(
  ADD_FEATURE_KEY
);

const { selectAll, selectEntities } = addAdapter.getSelectors();

export const getAddLoaded = createSelector(
  getAddState,
  (state: State) => state.loaded
);

export const getAddError = createSelector(
  getAddState,
  (state: State) => state.error
);

export const getAllAdd = createSelector(getAddState, (state: State) =>
  selectAll(state)
);

export const getAddEntities = createSelector(getAddState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getAddState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAddEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
