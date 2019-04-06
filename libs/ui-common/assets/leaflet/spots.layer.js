L.slackmap = L.slackmap || {};

L.slackmap.SpotsLayer = class SpotsLayer extends L.FeatureGroup {

  constructor() {
    super();
    this.on('click', function (e) {
      this._map.fire('item-click', {item: e.layer.item});
    });
  }

  setSpots(spots) {
    this.clearLayers();
    if(!spots) {
      return;
    }
    for (const item of spots) {
      const layer = L.slackmap.markerFactory(item);
      if (layer) {
        this.addLayer(layer);
      }
    }
  };
}
