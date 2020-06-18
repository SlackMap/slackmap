import * as L from 'leaflet';
import { AccessType } from '@slackmap/core';
import { SpotModel } from '@slackmap/api/spot/dto';

/**
 * Area Label
 */
export class AreaMarker extends L.Marker {
  _latlng: L.LatLng;
  highlighted = false;
  shapeLayer: L.GeoJSON<any>;
  constructor(private item: SpotModel<GeoJSON.Polygon>, private itemUtils, options?) {
    super(L.GeoJSON.coordsToLatLng(item.position as [number, number]), options);

    this.options.icon = new L.DivIcon({
      html: '<span></span>',
      className: 'item-label'
    });
    if (item.geometry) {
      let color = 'green';
      if (item.access === AccessType.RESTRICTED) {
        color = 'yellow';
      } else if (item.access === AccessType.FORBIDDEN) {
        color = 'red';
      }
      this.shapeLayer = L.geoJSON(item.geometry, {
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
          this._map.fire('item-click', { item: item });
        }
      });
    }
    L.Util.setOptions(this, options);
    this._latlng = L.latLng(L.GeoJSON.coordsToLatLng(item.position as [number, number]));
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
      // if (!this.getPopup()) {
      //   if (this.itemUtils) {
      //     this.bindPopup(this.itemUtils.getTitleHtml(this.item));
      //   } else {
      //     this.bindPopup(this.item.name || 'Area');
      //   }
      // }
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
