
import { SpotsActions, SpotsActionTypes } from './spots.actions';

export const SPOT_FEATURE_KEY = 'spot';

export interface SpotPartialState {
  readonly [SPOT_FEATURE_KEY]: SpotState
}

export interface SpotState {

}

export const initialState: SpotState = {

};

export function reducer(state = initialState, action: SpotsActions): SpotState {
  switch (action.type) {

    // case SpotsActionTypes.LoadSpotss:
    //   return state;

    default:
      return state;
  }
}
