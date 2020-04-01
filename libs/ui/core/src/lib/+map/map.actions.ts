import { createAction, props } from '@ngrx/store';
import { MapViewChangeData } from './map.models';
import { ArrayDiff } from '../utils';
import { LayerType } from '@slackmap/core';
import { ItemModel } from '@slackmap/api-client';

// fired when user moves the map, or the viewport changes
export const viewChange = createAction(
  '[Map] View Change',
  props<{ view: MapViewChangeData }>()
);

// calculate new hashes based on the map view change
export const viewHashesChange = createAction(
  '[Map] View Hashes Change',
  props<{ data: ArrayDiff<string> }>()
);

// fired when layer filters are changed by the user
export const layerFiltersChange = createAction(
  '[Map] Layer Filters Change',
  props<{ layer: LayerType, filters: string[] }>()
);

// enable or disable the layer
export const layerEnabledChange = createAction(
  '[Map] Layer Enabled Change',
  props<{ layer: LayerType, enabled: boolean }>()
);

// when you click item on the map
export const itemClick = createAction(
  '[Map] Item Click',
  props<{ item: ItemModel }>()
);

// fire it if you want to zoom map to items, map will react to it
export const zoomItems = createAction(
  '[Map] Zoom Items',
  props<{ items: ItemModel[] }>()
);
