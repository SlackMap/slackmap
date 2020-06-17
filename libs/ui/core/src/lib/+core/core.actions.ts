import { createAction, props } from '@ngrx/store';

export const isHandset = createAction(
  '[Core] Is Handset',
  props<{ isHandset: boolean }>()
);

export const showMap = createAction(
  '[Core] Show Map',
  props<{ showMap: boolean }>()
);

export const showMapToggle = createAction(
  '[Core] Show Map Toggle',
);
