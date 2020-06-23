import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ADD_FEATURE_KEY,
  AddState,
  AddPartialState,
} from './add.reducer';
import { SUBTYPE_OPTIONS, ItemType, SportType, DrawType, getSportOptionByName } from '@slackmap/core';
import { getMergedRoute, MergedRoute } from '@slackmap/ui/core';
import { AddRouteParams } from './add.models';

export const getAddState = createFeatureSelector<AddPartialState, AddState>(
  ADD_FEATURE_KEY
);

export const getSportType = createSelector(
  getAddState,
  (state: AddState) => state.sportType
);
export const getDrawType = createSelector(
  getAddState,
  (state: AddState) => state.drawType
);
export const getSpot = createSelector(
  getAddState,
  (state: AddState) => state.spot
);
export const getData = createSelector(
  getAddState,
  (state: AddState) => state.data
);
export const getSubtypeOptions = createSelector(
  getAddState,
  (state: AddState) => SUBTYPE_OPTIONS.filter(o => (o.type === ItemType.SPOT && o.drawType === state.drawType))
);

