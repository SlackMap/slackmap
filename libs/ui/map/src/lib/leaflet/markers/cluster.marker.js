L.slackmap = L.slackmap || {};

L.slackmap.ClusterMarker = class ClusterMarker extends L.Marker {

  constructor(item, options) {
    super(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates), options);

    this.item = item;
    // cluster icon
    var c = 'marker-cluster-';
    var color = '#64BDE5';
    if (item.spot_count < 10) {
      c += 'small';
      color = '#92D664';
    } else if (item.spot_count < 100) {
      c += 'medium';
      color = '#EECC3B';
    } else {
      c += 'large';
      color = '#F29847';
    }

    this.options.icon = new L.DivIcon({
      html: '<div><span>' + item.spot_count || 0 + '</span></div>',
      className: 'marker-cluster ' + c,
      iconSize: new L.Point(40, 40)
    });

    if (item.shape) {
      this.shapeLayer = L.geoJSON(item.shape, {
        style: data => {
          return {
            color: color,
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
