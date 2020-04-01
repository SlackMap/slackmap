import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MAP_FEATURE_KEY,
  State,
  MapPartialState,
} from './map.reducer';
import { getSpotLayer } from '../+spot/spot.selectors';
import { LayerType, ItemType } from '@slackmap/core';
import { LoadHashResponse } from '../+spot/spot.models';

// Lookup the 'Map' feature state managed by NgRx
export const getMapState = createFeatureSelector<MapPartialState, State>(MAP_FEATURE_KEY);

export const getMapView = createSelector(getMapState, (state: State) => state.view);
export const getMapLayerEnabled = createSelector(getMapState, (state: State) => state.layer_enabled);
export const getMapLayerFilters = createSelector(getMapState, (state: State) => state.layer_filters);

// select filters for specific layer type
export const getMapFilters = function (layer: LayerType) {
  return createSelector(
    getMapLayerFilters,
    (layers) => layers[layer]
  );
};

// select spots for specific layer type, apply filters to them
export const getMapLayerFilteredSpots = function (layer: LayerType) {
  return createSelector(
    getSpotLayer(layer),
    getMapFilters(layer),
    (spots: {[key: string]: LoadHashResponse}, filters) => {

      // convert has of arrays, to flat array
      const arr = Object.values(spots).reduce((acc, v) => acc.concat(v.data ? v.data.spots : []), []);

      // filter out spots from clusters, and recount
      if (!filters.length) {
        return arr;
      }
      return arr.map(spot => {
        if (spot.type !== ItemType.CLUSTER) {
          return spot;
        }
        let spot_count = 0;
        const counts: any = {};
        for (const name in spot.counts) {
          if (filters.indexOf(name) >= 0) {
            counts[name] = spot.counts[name];
            spot_count += spot.counts[name];
          }
        }
        return {
          ...spot,
          spot_count,
          counts
        };
      }).filter(spot => {
        if (spot.type === ItemType.CLUSTER) {
          return !!spot.spot_count;
        } else {
          return true;
        }
      });
    }
  );
};
