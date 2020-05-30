import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SPOT_FEATURE_KEY, SpotState, SpotPartialState, } from './spot.reducer';
import { SportType } from '@slackmap/core';

// Lookup the 'Spots' feature state managed by NgRx
export const getSpotState = createFeatureSelector<SpotPartialState, SpotState>(
  SPOT_FEATURE_KEY
);

export const getSpotLayers = createSelector(
  getSpotState,
  state => state.layers,
);

export const getSpotLayer = function (layer: SportType) {
  return createSelector(
    getSpotLayers,
    layers => layers[layer],
  );
};
