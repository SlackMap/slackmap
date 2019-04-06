L.slackmap = L.slackmap || {};

L.slackmap.PoiMarker = class PoiMarker extends L.Marker {

  constructor(item, options) {
    super(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates), options);
    this.item = item;
    if (item.shape) {
      this.shapeLayer = L.geoJSON(item.shape, {
        style: data => {
          return {
            color: 'black',
            weight: 1,
            opacity: 1,
            fill: false,
            clickable: true
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            click: function(e) {
              this.fire('click', e);
            }
          });
        }
      });
    }
  }

  onAdd(map) {
    L.Marker.prototype.onAdd.apply(this, arguments);
    if (this.shapeLayer) {
      this._map.addLayer(this.shapeLayer);
    }

    return this;
  }

  onRemove(map) {
    // remove the shape
    if (this.shapeLayer) {
      this._map.removeLayer(this.shapeLayer);
    }
    L.Marker.prototype.onRemove.apply(this, arguments);
    return this;
  }
}
