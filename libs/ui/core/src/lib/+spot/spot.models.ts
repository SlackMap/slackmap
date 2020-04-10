import {SportType} from '@slackmap/core';

/**
 * success response from cache or request
 */
export enum ResponseSource {
  STORAGE = 'storage',
  SERVER = 'server'
}

/**
 * success response from cashe or request
 */
export interface LoadHashResponse {
  layer: SportType;
  hash: string;
  source: ResponseSource;
  timestamp: number;
  data?: any;
  error?: any;
}
