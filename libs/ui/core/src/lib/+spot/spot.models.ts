import {SportType} from '@slackmap/core';
import { ClustersSpotsGetDto } from '@slackmap/api-client';

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
  data?: ClustersSpotsGetDto;
  error?: any;
}
