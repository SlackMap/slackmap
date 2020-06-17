import { createAction, props } from '@ngrx/store';
import { SportType, ItemSubtypes } from '@slackmap/core';
import { LoadHashResponse } from './spot.models';
import { ArrayDiff } from '@slackmap/ui/common/utils';

/**
 * fired to init the loading
 * not used for now
 */
export const hashLoad = createAction(
  '[Spot] Hash Load',
  props<{ hash: string, layer: SportType }>()
);

/**
 * fired to indicate that loading has started
 */
export const hashLoading = createAction(
  '[Spot] Hash Loading',
  props<{ hash: string, layer: SportType, loading: boolean }>()
);

/**
 * fired by the case if it has the cached value
 */
export const hashStorageSuccess = createAction(
  '[Spot] Hash Storage Success',
  props<{ data: LoadHashResponse }>()
);

/**
 * fired when request to server finished
 */
export const hashRequestSuccess = createAction(
  '[Spot] Hash Request Success',
  props<{ data: LoadHashResponse }>()
);

/**
 * fired when request to server finished
 */
export const hashRequestFailure = createAction(
  '[Spot] Hash Request Failure',
  props<{ data: LoadHashResponse }>()
);

/**
 * clear the hash data from the store
 */
export const hashClear = createAction(
  '[Spot] Hash Clear',
  props<{ hash: string, layer: SportType }>()
);

/**
 * no connection with the server
 */
export const hashNoConnection = createAction(
  '[Spot] Hash No Connection',
  props<{ hash: string, layer: SportType }>()
);

// calculate new hashes based on the map view change
export const viewHashesChange = createAction(
  '[Spot] View Hashes Change',
  props<{ data: ArrayDiff<string> }>()
);

// fired when layer filters are changed by the user
export const subtypesEnabledChange = createAction(
  '[Core] Subtypes Enabled Change',
  props<{ subtypesEnabled: ItemSubtypes[] }>()
);

// enable or disable the layer
export const sportsEnabledChange = createAction(
  '[Core] Sports Enabled Change',
  props<{ sportsEnabled: SportType[] }>()
);
