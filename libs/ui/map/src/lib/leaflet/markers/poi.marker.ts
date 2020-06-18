import * as L from 'leaflet';
import { PoiItem } from '@slackmap/core';

export class PoiMarker extends L.Marker {

  geometryLayer: L.GeoJSON<any>;

  constructor(private item: PoiItem, options?) {
    super(L.GeoJSON.coordsToLatLng(item.position as [number, number]), options);
    this.item = item;
    if (item.geometry) {
      this.geometryLayer = L.geoJSON(item.geometry, {
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
    if (this.geometryLayer) {
      this._map.addLayer(this.geometryLayer);
    }

    return this;
  }

  onRemove(map) {
    // remove the shape
    if (this.geometryLayer) {
      this._map.removeLayer(this.geometryLayer);
    }
    L.Marker.prototype.onRemove.apply(this, arguments);
    return this;
  }
}
