import {createFeatureSelector, createSelector} from '@ngrx/store';
import { MergedRouteReducerState } from './router.models';
import { ROUTER_FEATURE_KEY } from './router.reducer';

export const getRouterState = createFeatureSelector<MergedRouteReducerState>(ROUTER_FEATURE_KEY);

export const getMergedRoute = createSelector(getRouterState, (routerReducerState) => routerReducerState ? routerReducerState.state : null);
