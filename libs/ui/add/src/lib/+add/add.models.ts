import { DrawType } from '@slackmap/ui/map';
import { SportType, SportName } from '@slackmap/core';

/**
 * Model for update action
 */
export interface AddStateModel {
  sport: SportType;
  drawType: DrawType;
}

export interface AddRouteParams {
  sportName: SportName;
  drawType: DrawType;
}
