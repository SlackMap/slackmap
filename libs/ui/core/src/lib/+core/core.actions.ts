import { createAction, props } from '@ngrx/store';
import { ItemSubtype, SportType } from '@slackmap/core';

export const version = createAction(
  '[Core] Version',
  props<{ version: string }>()
);

// fired when layer filters are changed by the user
export const subtypesEnabledChange = createAction(
  '[Core] Subtypes Enabled Change',
  props<{ subtypesEnabled: ItemSubtype[] }>()
);

// enable or disable the layer
export const sportsEnabledChange = createAction(
  '[Core] Sports Enabled Change',
  props<{ sportsEnabled: SportType[] }>()
);
