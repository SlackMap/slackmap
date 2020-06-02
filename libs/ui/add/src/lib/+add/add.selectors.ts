import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ADD_FEATURE_KEY,
  AddState,
  AddPartialState,
} from './add.reducer';

export const getAddState = createFeatureSelector<AddPartialState, AddState>(
  ADD_FEATURE_KEY
);

export const getSport = createSelector(
  getAddState,
  (state: AddState) => state.sport
);
export const getDrawType = createSelector(
  getAddState,
  (state: AddState) => state.drawType
);
export const getDrawData = createSelector(
  getAddState,
  (state: AddState) => state.drawData
);

