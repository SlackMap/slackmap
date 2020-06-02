import { createAction, props } from '@ngrx/store';
import { SportType } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';


export const reset = createAction(
  '[Add] Reset'
);
export const setSport = createAction(
  '[Add] Set Sport',
  props<{ sport: SportType }>()
);

export const setDrawType = createAction(
  '[Add] Set DrawType',
  props<{ drawType: DrawType }>()
);
export const setDrawData = createAction(
  '[Add] Set DrawData',
  props<{ drawData: DrawData }>()
);

