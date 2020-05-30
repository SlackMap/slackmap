import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MAP_FEATURE_KEY,
  MapState,
  MapPartialState,
} from './map.reducer';

export const getMapState = createFeatureSelector<MapPartialState, MapState>(MAP_FEATURE_KEY);

export const getMapView = createSelector(getMapState, (state) => state.view);
