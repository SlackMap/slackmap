import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CoreFeature from './core.reducer';

export const getCoreState = createFeatureSelector<CoreFeature.CorePartialState, CoreFeature.CoreState>(
  CoreFeature.CORE_FEATURE_KEY
);

export const getIsHandset = createSelector(getCoreState, state => state.isHandset)

export const getShowMap = createSelector(getCoreState, state => state.showMap)
export const getSports = createSelector(getCoreState, state => state.sports)
export const getSubtypes = createSelector(getCoreState, state => state.subtypes)

export const getSelectedSportIds = createSelector(getCoreState, state => state.selectedSportIds)
export const getSelectedSubtypeIds = createSelector(getCoreState, state => state.selectedSubtypeIds)

export const getSelectedSports = createSelector(getSports, getSelectedSportIds, (sports, selected) => sports.filter(s => selected.includes(s.id)))
export const getSelectedSubtypes = createSelector(getSubtypes, getSelectedSubtypeIds, (subtypes, selected) => subtypes.filter(s => selected.includes(s.id)))
