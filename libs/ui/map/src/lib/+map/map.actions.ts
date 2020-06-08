import { createAction, props } from '@ngrx/store';
import { MapViewChangeData } from './map.models';
import { PoiItem } from '@slackmap/core';

// fired when user moves the map, or the viewport changes
export const viewChange = createAction(
  '[Map] View Change',
  props<{ view: MapViewChangeData }>()
);

// when you click item on the map
export const itemClick = createAction(
  '[Map] Item Click',
  props<{ item: PoiItem }>()
);

// fire it if you want to zoom map to items, map will react to it
export const zoomItems = createAction(
  '[Map] Zoom Items',
  props<{ items: PoiItem[] }>()
);
