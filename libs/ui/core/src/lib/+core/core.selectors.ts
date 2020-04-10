import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CORE_FEATURE_KEY,
  State,
  CorePartialState,
} from './core.reducer';

// Lookup the 'Core' feature state managed by NgRx
export const getCoreState = createFeatureSelector<CorePartialState, State>(
  CORE_FEATURE_KEY
);

export const getCoreVersion = createSelector(getCoreState, state => state.version);
