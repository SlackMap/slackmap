import { createAction, props } from '@ngrx/store';
import { ConfigEntity } from './config.models';

export const loadConfig = createAction('[Config] Load Config');

export const loadConfigSuccess = createAction(
  '[Config] Load Config Success',
  props<{ config: ConfigEntity[] }>()
);

export const loadConfigFailure = createAction(
  '[Config] Load Config Failure',
  props<{ error: any }>()
);
