
import { MapActions, MapActionTypes } from './map.actions';

export const MAP_FEATURE_KEY = 'map';

export interface MapPartialState {
  readonly [MAP_FEATURE_KEY]: MapState;
}

export interface MapState {
  loaded: any[]
}

export const mapInitialState: MapState = {
  loaded: []
};

export function reducer(state = mapInitialState, action: MapActions): MapState {
  switch (action.type) {

    case MapActionTypes.LoadMaps: {
      // logika
      return state;
    }

    default:
      return state;
  }
}
