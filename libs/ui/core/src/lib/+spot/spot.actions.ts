import { createAction, props } from '@ngrx/store';
import { SportType } from '@slackmap/core';
import { LoadHashResponse } from './spot.models';

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
