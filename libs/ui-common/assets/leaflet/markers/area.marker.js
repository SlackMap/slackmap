L.slackmap = L.slackmap || {};

/**
 * Area Label
 */
L.slackmap.AreaMarker = class AreaMarker extends L.Marker {

  constructor(item, itemUtils, options) {
    super(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates), options);
    this.item = item;
    this.itemUtils = itemUtils;
    this.highlighted = false;

    this.options.icon = new L.DivIcon({
      html: '<span></span>',
      className: 'item-label'
    });
    if (item.shape) {
      var color = 'green';
      if (item.access == 2) {
        color = 'yellow';
      } else if (item.access == 3) {
        color = 'red';
      }
      this.shapeLayer = L.geoJSON(item.shape, {
        style: () => {
          return {
            color: color,
            weight: 2,
            opacity: 0.8,
            fill: true,
            fillColor: color, //same as color by default
            fillOpacity: 0.05,
            clickable: true
          };
        }
      });
      this.shapeLayer.on('click', e => {
        if (this._map) {
          this._map.fire('item-click', {item: item});
        }
      });
    }
    L.Util.setOptions(this, options);
    this._latlng = L.latLng(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates));
  }
  onAdd(map) {
    L.Marker.prototype.onAdd.apply(this, arguments);
    if (this.shapeLayer) {
      this._map.addLayer(this.shapeLayer);
    }
    if (this.highlighted) {
      this.highlight();
    }
    return this;
  }
  onRemove(map) {
    // remove the shape
    if (this.shapeLayer) {
      this._map.removeLayer(this.shapeLayer);
    }
    this.diminish();
    L.Marker.prototype.onRemove.apply(this, arguments);
    return this;
  }
  highlight() {
    this.highlighted = true;
    if (this._map) {
      if (!this.getPopup()) {
        if (this.itemUtils) {
          this.bindPopup(this.itemUtils.getTitleHtml(this.item));
        } else {
          this.bindPopup(this.item.name || 'Area');
        }
      }
      this.openPopup();
    }
  }
  diminish() {
    if (this.getPopup()) {
      this.closePopup();
      this.unbindPopup();
    }
  }
}
