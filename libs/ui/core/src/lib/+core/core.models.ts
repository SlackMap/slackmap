import { DrawType } from '@slackmap/ui/map';
import { SportType, SportName, ItemSubtype } from '@slackmap/core';

export interface CoreRouteParams {
  sportNames: string;
  subtypeNames: string;
}

export interface CoreQueryParams {
  map: string;
}
