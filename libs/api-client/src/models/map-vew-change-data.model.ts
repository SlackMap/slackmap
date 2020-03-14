import {GeojsonBbox} from './geojson';

export interface MapViewChangeData {
  bounds: [[number, number], [number, number]];
  bbox: GeojsonBbox;
  zoom: number;
  hashes?: string[];
}
