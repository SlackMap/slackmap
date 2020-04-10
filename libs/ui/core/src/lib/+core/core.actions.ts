import { createAction, props } from '@ngrx/store';

export const version = createAction(
  '[Core] Version',
  props<{ version: string }>()
);
