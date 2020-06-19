import { createAction, props } from '@ngrx/store';
import { SportType } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';
import { SpotModel, SpotSaveRequestDto, SpotSaveDto } from '@slackmap/api/spot/dto';


export const reset = createAction(
  '[Add] Reset'
);
export const setSport = createAction(
  '[Add] Set Sport',
  props<{ sportType: SportType }>()
);

export const setDrawType = createAction(
  '[Add] Set DrawType',
  props<{ drawType: DrawType }>()
);
export const setDrawData = createAction(
  '[Add] Set DrawData',
  props<{ drawData: DrawData }>()
);
export const setSpot = createAction(
  '[Add] Set Spot',
  props<{ spot: SpotModel }>()
);
export const setSpotData = createAction(
  '[Add] Set SpotData',
  props<{ spotData: Partial<SpotModel> }>()
);
export const save = createAction(
  '[Add] Save',
  props<SpotSaveRequestDto>()
);
export const saveSuccess = createAction(
  '[Add] Save Success',
  props<{ response: SpotSaveDto }>()
);
export const saveFailure = createAction(
  '[Add] Save Failure',
  props<{ error: any }>()
);

