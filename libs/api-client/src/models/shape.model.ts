import {SpotCategory} from '@slackmap/core';

/**
 * draw handler will emit this data
 */
export interface ShapeData {
  shape: any;
  coordinates: any;
  distance: number;
  vertexCount: number;
  category: SpotCategory;
}
