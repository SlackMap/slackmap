import { DrawType } from '@slackmap/ui/map';
import { SportType } from '@slackmap/core';

/**
 * Model for update action
 */
export interface AddStateModel {
  sport: SportType;
  drawType: DrawType;
}
