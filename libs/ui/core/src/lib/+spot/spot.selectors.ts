import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SPOT_FEATURE_KEY, State, SpotPartialState, } from './spot.reducer';
import { LayerType } from '@slackmap/core';

// Lookup the 'Spots' feature state managed by NgRx
export const getSpotState = createFeatureSelector<SpotPartialState, State>(
  SPOT_FEATURE_KEY
);

export const getSpotLayers = createSelector(
  getSpotState,
  state => state.layers,
);

export const getSpotLayer = function (layer: LayerType) {
  return createSelector(
    getSpotLayers,
    layers => layers[layer],
  );
};
