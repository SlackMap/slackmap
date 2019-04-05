import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAP_FEATURE_KEY, MapState } from './map.reducer';

const getUserState = createFeatureSelector<MapState>(MAP_FEATURE_KEY);

export const getLoaded = createSelector(
  getUserState,
  (state: MapState) => state.loaded,
);
