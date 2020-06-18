import * as L from 'leaflet';
import { ClusterModel } from '@slackmap/api/clusters/dto';

export class ClusterMarker extends L.Marker {

  constructor(private item: ClusterModel, options?) {
    super(L.GeoJSON.coordsToLatLng(item.position as [number, number]), options);

    this.item = item;
    // cluster icon
    let c = 'marker-cluster-';
    let color = '#64BDE5';
    if (item.spotCount < 10) {
      c += 'small';
      color = '#92D664';
    } else if (item.spotCount < 100) {
      c += 'medium';
      color = '#EECC3B';
    } else {
      c += 'large';
      color = '#F29847';
    }

    this.options.icon = new L.DivIcon({
      html: '<div><span>' + item.spotCount || 0 + '</span></div>',
      className: 'marker-cluster ' + c,
      iconSize: new L.Point(40, 40)
    });

  }

  onAdd(map) {
    L.Marker.prototype.onAdd.apply(this, arguments);
    return this;
  }

  onRemove(map) {
    L.Marker.prototype.onRemove.apply(this, arguments);
    return this;
  }
}
