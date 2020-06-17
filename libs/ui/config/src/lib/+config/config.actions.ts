import { createAction, props } from '@ngrx/store';
import { ConfigModel } from './config.models';

export const loadConfig = createAction('[Config] Load Config');

export const version = createAction(
  '[Config] Version',
  props<{ version: string }>()
);

export const loadConfigSuccess = createAction(
  '[Config] Load Config Success',
  props<{ config: ConfigModel }>()
);

export const loadConfigFailure = createAction(
  '[Config] Load Config Failure',
  props<{ error: any }>()
);
