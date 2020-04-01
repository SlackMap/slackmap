import { createAction, props } from '@ngrx/store';
import { CoreEntity } from './core.models';

export const loadCore = createAction('[Core] Load Core');

export const loadCoreSuccess = createAction(
  '[Core] Load Core Success',
  props<{ core: CoreEntity[] }>()
);

export const loadCoreFailure = createAction(
  '[Core] Load Core Failure',
  props<{ error: any }>()
);
