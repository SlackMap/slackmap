import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CoreFeature from './core.reducer';

export const getCoreState = createFeatureSelector<CoreFeature.CorePartialState, CoreFeature.CoreState>(
  CoreFeature.CORE_FEATURE_KEY
);
