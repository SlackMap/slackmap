import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAP_FEATURE_KEY, MapState, MapPartialState } from './map.reducer';
import { LayerType, ItemType } from '@slackmap/core';
import { selectSpotsLayer } from '../../state/spot/spot.selectors';

const getMapState = createFeatureSelector<MapState>(MAP_FEATURE_KEY);

export const selectMapView = createSelector(getMapState, (state: MapState) => state.view);
export const selectMapLayerEnabled = createSelector(getMapState, (state: MapState) => state.layer_enabled);
export const selectMapLayerFilters = createSelector(getMapState, (state: MapState) => state.layer_filters);

// select filters for specific layer type
export const selectMapFilters = function (layer: LayerType) {
  return createSelector(
    selectMapLayerFilters,
    (layers) => layers[layer]
  );
};

// select spots for specific layer type, apply filters to them
export const selectMapLayerFilteredSpots = function (layer: LayerType) {
  return createSelector(
    selectSpotsLayer(layer),
    selectMapFilters(layer),
    (spots, filters) => {

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
