import * as L from 'leaflet';
import { getSubtypeFromItem, getLength } from '@slackmap/core';

/**
 * Line Marker
 */
export class LineMarker extends L.Marker {
  len = 0;
  highlighted = false;
  shapeLayer: L.GeoJSON<any>;
  _marker1: L.Marker;
  _marker2: L.Marker;
  _icon: any;

  constructor(private item, private itemUtils, options?) {
    super(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates), options);


    this.options.icon = new L.DivIcon({
      html: '0m',
      className: 'item-label item-line-label '
    });

    if (item.shape) {
      this.shapeLayer = L.geoJSON(item.shape, {
        style: data => {
          return {
            color: (getSubtypeFromItem(this.item) || {}).color,
            weight: 3,
            opacity: 0.9,
            clickable: true,
            typeId: 0,
            stroke: true
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            click: function (e) {
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
    if (this.highlighted) {
      this.highlight();
    }

    this.updateLength();
    this.updateColor();

    return this;
  }

  onRemove(map) {
    // remove the shape
    if (this.shapeLayer) {
      this._map.removeLayer(this.shapeLayer);
    }
    this.diminish();
    // this.userWatchHandler();
    L.Marker.prototype.onRemove.apply(this, arguments);
    return this;
  }

  updateColor() {
    if (!this.item || !this._icon) { return; }
    this._icon.style.background = (getSubtypeFromItem(this.item) || {}).color;
    if (this.item.subtype === 7) {
      this._icon.style.color = 'white';
    } else {
      this._icon.style.color = 'black';
    }
  }

  updateLength() {
    if (!this._icon) { return; }
    this._icon.innerHTML = getLength(this.item);
  }

  highlight() {
    this.highlighted = true;
    if (this._map && this.item && this.item.shape && !this._marker1) {
      this._marker1 = L.marker([this.item.shape.coordinates[0][1], this.item.shape.coordinates[0][0]]).addTo(this._map);
      this._marker2 = L.marker([this.item.shape.coordinates[1][1], this.item.shape.coordinates[1][0]]).addTo(this._map);
      // this._marker1.bounce(1);
      // this._marker2.bounce(1);
      this.setZIndexOffset(1000);
      this._icon.classList.add('item-highlight');
    }
  }

  diminish() {
    if (this._marker1) {
      this._map.removeLayer(this._marker1);
      this._marker1 = null;
    }
    if (this._marker2) {
      this._map.removeLayer(this._marker2);
      this._marker2 = null;
    }
    this._icon.classList.remove('item-highlight');
  }
}
