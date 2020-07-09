import * as L from 'leaflet';
import { ItemUtils } from '@slackmap/core';
import { MarkerFactory } from '../markers';

export class SpotsLayer extends L.FeatureGroup {
  factory: MarkerFactory;
  constructor(private itemUtils: ItemUtils) {
    super();
    this.factory = new MarkerFactory(this.itemUtils);
    this.on('click', function (e) {
      this._map.fire('item-click', {item: e.propagatedFrom.item});
    });
  }

  setSpots(spots) {
    console.log('set spots and clear', spots)
    this.clearLayers();
    if(!spots) {
      return;
    }
    for (const item of spots) {
      const layer = this.factory.create(item);
      if (layer) {
        this.addLayer(layer);
      }
    }
  };
}
