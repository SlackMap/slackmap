import {Marker, Icon, Point, GeoJSON} from 'leaflet';
import { SUBTYPE_OPTIONS } from '@slackmap/core';
import { ClusterModel } from '@slackmap/api/clusters/dto';

export class ClusterCountsMarker extends Marker {
  constructor(private item: ClusterModel, options?) {
    super(GeoJSON.coordsToLatLng(item.position as [number, number]), options);

    this.options.icon = new ClusterIcon({
      counts: item.counts,
      total: item.spotCount
    });
  }
};

const COLORS = SUBTYPE_OPTIONS.filter(t => t.color).reduce(
  (colors, type, index, array) => {
    colors[type.id] = type.color;
    return colors;
  },
  {}
);
const pi2 = Math.PI * 2;
interface IconData {
  counts: {[key: string]: number},
  total: number
}
/**
 * based on Leaflet PruneCluster example
 */
class ClusterIcon extends Icon {

  constructor(private data: IconData, options?) {
    super(options);
    this.options.iconSize = [44, 44];
  }

  createIcon() {
    // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
    const e = document.createElement('canvas');
    this['_setIconStyles'](e, 'icon');
    const s = this.options.iconSize;
    e.width = s[0];
    e.height = s[1];
    this.draw(e.getContext('2d'), s[0], s[1]);
    return e;
  }

  createShadow() {
    return null;
  }

  draw(canvas, width, height) {
    let start = 0;
    for (const i in this.data.counts) {
      if (this.data.counts.hasOwnProperty(i)) {

        const size = this.data.counts[i] / this.data.total;

        if (size > 0) {
          canvas.beginPath();
          canvas.moveTo(22, 22);
          canvas.fillStyle = COLORS[i];
          let from = start + 0.14;
          const to = start + size * pi2;

          if (to < from) {
            from = start;
          }
          canvas.arc(22, 22, 22, from, to);
          start = start + size * pi2;
          canvas.lineTo(22, 22);
          canvas.fill();
          canvas.closePath();
        }
      }
    }

    canvas.beginPath();
    canvas.fillStyle = 'white';
    canvas.arc(22, 22, 14, 0, Math.PI * 2);
    canvas.fill();
    canvas.closePath();

    canvas.fillStyle = '#555';
    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = 'bold 12px sans-serif';

    canvas.fillText(this.data.total, 22, 22, 40);
  }
}
