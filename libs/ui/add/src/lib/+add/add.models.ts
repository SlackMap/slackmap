import { DrawType } from '@slackmap/ui/map';
import { SportType, SportName } from '@slackmap/core';

export interface AddRouteParams {
  sportName: SportName;
  drawType: DrawType;
}
