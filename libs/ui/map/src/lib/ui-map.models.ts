import {GeojsonBbox} from '@slackmap/api-client';
import { Observable } from 'rxjs';

export interface MapViewChangeData {
  bounds: [[number, number], [number, number]];
  bbox: GeojsonBbox;
  zoom: number;
  hashes?: string[];
}

export interface MapComponent {
  viewChange$: Observable<MapViewChangeData>;
  itemClick$: Observable<{item: any}>;
  spotsLayer(spots$: Observable<any>): Observable<void>
}
