import { createAction, props } from '@ngrx/store';
import { SportType } from '@slackmap/core';
import { DrawType, DrawData } from '@slackmap/ui/map';
import { SpotModel, SpotSaveRequestDto, SpotSaveDto } from '@slackmap/api/spot/dto';


export const setSport = createAction(
  '[Add] Set Sport',
  props<{ sportType: SportType }>()
);

export const setDrawType = createAction(
  '[Add] Set DrawType',
  props<{ drawType: DrawType }>()
);

// spot for edit
export const setSpot = createAction(
  '[Add] Set Spot',
  props<{ spot: SpotModel }>()
);

// data of spot currently created or edited
export const setData = createAction(
  '[Add] Set Data',
  props<{ data: Partial<SpotModel> }>()
);
export const resetData = createAction(
  '[Add] Reset Data'
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

