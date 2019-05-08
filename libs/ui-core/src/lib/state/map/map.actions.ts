import {Action} from '@ngrx/store';
import {ItemModel, MapViewChangeData} from '@slackmap/core';
import {LayerType} from '@slackmap/core';
import {ArrayDiff} from '@slackmap/ui-common';

export enum MapActionTypes {
  MAP_VIEW_CHANGE = '[Map] View Change',
  MAP_VIEW_HASHES_CHANGE = '[Map] View Hashes Change',
  MAP_LAYER_FILTERS_CHANGE = '[Map] Layer Filters Change',
  MAP_LAYER_ENABLED_CHANGE = '[Map] Layer Enabled Change',
  MAP_ITEM_CLICK = '[Map] Item Click',
  MAP_ZOOM_ITEMS = '[Map] Zoom Items'
}

// fired when user moves the map, or the viewport changes
export class MapViewChangeAction implements Action {
  readonly type = MapActionTypes.MAP_VIEW_CHANGE;
  constructor(public payload: MapViewChangeData) {}
}

// fired when user moves the map, or the viewport changes
export class MapViewHashesChangeAction implements Action {
  readonly type = MapActionTypes.MAP_VIEW_HASHES_CHANGE;
  constructor(public payload: ArrayDiff<string>) {}
}

// fired when layer filters are changed by the user
export class MapLayerFiltersChangeAction implements Action {
  readonly type = MapActionTypes.MAP_LAYER_FILTERS_CHANGE;
  constructor(public payload: {layer: LayerType, filters: string[]}) {}
}

// enable or disable the layer
export class MapLayerEnabledChangeAction implements Action {
  readonly type = MapActionTypes.MAP_LAYER_ENABLED_CHANGE;
  constructor(public payload: {layer: LayerType, enabled: boolean}) {}
}

// when you click item on the map
export class MapItemClickAction implements Action {
  readonly type = MapActionTypes.MAP_ITEM_CLICK;
  constructor(public payload: {item: ItemModel}) {}
}

// fire it if you want to zoom map to items, map will react to it
export class MapZoomItemsAction implements Action {
  readonly type = MapActionTypes.MAP_ZOOM_ITEMS;
  constructor(public payload: ItemModel[]) {}
}

// action types
export type MapActions =
  MapViewChangeAction |
  MapViewHashesChangeAction |
  MapLayerFiltersChangeAction |
  MapLayerEnabledChangeAction |
  MapItemClickAction |
  MapZoomItemsAction;
