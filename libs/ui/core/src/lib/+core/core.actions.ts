import { createAction, props } from '@ngrx/store';
import { ItemSubtype, SportType } from '@slackmap/core';
import { CorePartialStateForRoute } from './core.reducer';

export const isHandset = createAction(
  '[Core] Is Handset',
  props<{ isHandset: boolean }>()
);

export const showMap = createAction(
  '[Core] Show Map',
  props<{ showMap: boolean }>()
);

// fired from router by effect
export const updateFromRoute = createAction(
  '[Core] Update From Route',
  props<{
    state: Partial<CorePartialStateForRoute>
  }>()
);

// use this if you want to programmaticly change selected sports & subtypes
export const sportFilterChange = createAction(
  '[Core] Sport Filter Change',
  props<{
    state: Partial<CorePartialStateForRoute>
  }>()
);

// when you select the item itself, you get the selected sport from the item record
export const setSport = createAction(
  '[Core] Set Sport',
  props<{
    sport: SportType
  }>()
);

export const showMapToggle = createAction(
  '[Core] Show Map Toggle',
);
