import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SPOT_FEATURE_KEY, SpotState } from './spot.reducer';
import { LayerType } from '@slackmap/core';

const getSpotState = createFeatureSelector<SpotState>(SPOT_FEATURE_KEY);

export const selectSpotsLayers = createSelector(
  getSpotState,
  state => state.layer_spots,
);

export const selectSpotsLayer = function(layer: LayerType) {
  return createSelector(
    selectSpotsLayers,
    layers => layers[layer],
  );
};
