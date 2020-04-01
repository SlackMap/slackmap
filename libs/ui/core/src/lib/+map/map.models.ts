import {GeojsonBbox} from '@slackmap/api-client';

export interface MapViewChangeData {
  bounds: [[number, number], [number, number]];
  bbox: GeojsonBbox;
  zoom: number;
  hashes?: string[];
}
