import { createAction, props } from '@ngrx/store';
import { AddEntity } from './add.models';

export const loadAdd = createAction('[Add] Load Add');

export const loadAddSuccess = createAction(
  '[Add] Load Add Success',
  props<{ add: AddEntity[] }>()
);

export const loadAddFailure = createAction(
  '[Add] Load Add Failure',
  props<{ error: any }>()
);
