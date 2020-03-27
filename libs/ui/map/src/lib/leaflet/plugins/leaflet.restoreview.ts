import * as L from 'leaflet';

const RestoreViewMixin = {
  restoreView: function () {
    const storage = window.localStorage || {};
    if (!this.__initRestore) {
      this.on('moveend', function (e) {
        if (!this._loaded)
          return;  // Never access map bounds if view is not set.

        const v = {
          lat: this.getCenter().lat,
          lng: this.getCenter().lng,
          zoom: this.getZoom()
        };
        storage['mapView'] = JSON.stringify(v);
      }, this);
      this.__initRestore = true;
    }

    let view = storage['mapView'];
    try {
      view = JSON.parse(view || '');
      this.setView(L.latLng(view.lat, view.lng), view.zoom, true);
      return true;
    }
    catch (err) {
      return false;
    }
  }
};

export function restoreView(leaflet = L) {
  leaflet.Map.include(RestoreViewMixin);
}
