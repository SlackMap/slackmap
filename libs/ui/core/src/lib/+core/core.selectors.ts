import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CoreFeature from './core.reducer';

export const getCoreState = createFeatureSelector<CoreFeature.CorePartialState, CoreFeature.CoreState>(
  CoreFeature.CORE_FEATURE_KEY
);

export const getIsHandset = createSelector(getCoreState, state => state.isHandset)

export const getShowMap = createSelector(getCoreState, state => state.showMap)
