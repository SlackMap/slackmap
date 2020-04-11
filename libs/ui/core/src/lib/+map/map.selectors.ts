import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MAP_FEATURE_KEY,
  State,
  MapPartialState,
} from './map.reducer';
import { getSpotLayer } from '../+spot/spot.selectors';
import { SportType, ItemType, ItemSubtype } from '@slackmap/core';
import { LoadHashResponse } from '../+spot/spot.models';
import { ClusterModel, SpotModel } from '@slackmap/api-client';;

// Lookup the 'Map' feature state managed by NgRx
export const getMapState = createFeatureSelector<MapPartialState, State>(MAP_FEATURE_KEY);

export const getMapView = createSelector(getMapState, (state) => state.view);
export const getMapSportsEnabled = createSelector(getMapState, (state) => state.sportsEnabled);
export const getMapSubtypesEnabled = createSelector(getMapState, (state) => state.subtypesEnabled);

// select spots for specific layer type, apply filters to them
export const getMapSportFilteredSpots = function (sport: SportType) {
  return createSelector(
    getSpotLayer(sport),
    getMapSubtypesEnabled,
    (spots: {[key: string]: LoadHashResponse}, filters) => {

      // convert has of arrays, to flat array
      const arr: ClusterModel[] = Object.values(spots).reduce((acc, v) => acc.concat(v.data ? v.data.spots : []), []);

      // filter out spots from clusters, and recount
      if (!filters.length) {
        return arr;
      }
      return arr.map(spot => {
        // TODO this can be SpotModel, so we have to rethink how to do it right with good typings
        if (spot.type !== ItemType.CLUSTER) {
          return spot;
        }
        let spot_count = 0;
        const counts: any = {};
        for (const name in spot.counts) {
          if (spot.counts.hasOwnProperty(name)) {
            const id: ItemSubtype = parseInt(name, 10);
            if (filters.indexOf(id) >= 0) {
              counts[name] = spot.counts[id];
              spot_count += spot.counts[id];
            }
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
