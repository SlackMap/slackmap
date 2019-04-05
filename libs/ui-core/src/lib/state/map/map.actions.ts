import { Action } from '@ngrx/store';

export enum MapActionTypes {
  LoadMaps = '[Map] Load Maps',
  LoadMapsSuccess = '[Map] Load Maps Success',
  LoadMapsFailure = '[Map] Load Maps Failure',
}

export class LoadMaps implements Action {
  readonly type = MapActionTypes.LoadMaps;
}

export class LoadMapsSuccess implements Action {
  readonly type = MapActionTypes.LoadMapsSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadMapsFailure implements Action {
  readonly type = MapActionTypes.LoadMapsFailure;
  constructor(public payload: { error: any }) { }
}

export type MapActions = LoadMaps | LoadMapsSuccess | LoadMapsFailure;

