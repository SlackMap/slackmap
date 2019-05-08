L.slackmap = L.slackmap || {};
if(!L.slackmap.SUBTYPES) {
  throw Error('L.slackmap.SUBTYPES has to be provided, assign it before using markerFactory');
}
L.slackmap.ClusterCountsMarker = class ClusterCountsMarker extends L.Marker {

  constructor(item, options) {
    super(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates), options);
    this.item = item;

    this.options.icon = new ClusterIcon({
      counts: item.counts,
      total: item.spot_count
    });
  }
}

const colors = L.slackmap.SUBTYPES.filter(t=>t.color).reduce((colors, type, index, array)=>{colors[type.name]=type.color; return colors}, {})
const pi2 = Math.PI * 2;

/**
 * based on Leaflet PruneCluster example
 */
const ClusterIcon = L.Icon.extend({
  options: {
      iconSize: new L.Point(44, 44)
  },

  createIcon: function () {
      // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
      var e = document.createElement('canvas');
      this._setIconStyles(e, 'icon');
      var s = this.options.iconSize;
      e.width = s.x;
      e.height = s.y;
      this.draw(e.getContext('2d'), s.x, s.y);
      return e;
  },

  createShadow: function () {
      return null;
  },

  draw: function(canvas, width, height) {

      var start = 0;
      for (let i in this.options.counts) {

          var size = this.options.counts[i] / this.options.total;

          if (size > 0) {
              canvas.beginPath();
              canvas.moveTo(22, 22);
              canvas.fillStyle = colors[i];
              var from = start + 0.14,
                  to = start + size * pi2;

              if (to < from) {
                  from = start;
              }
              canvas.arc(22,22,22, from, to);
              start = start + size*pi2;
              canvas.lineTo(22,22);
              canvas.fill();
              canvas.closePath();
          }

      }

      canvas.beginPath();
      canvas.fillStyle = 'white';
      canvas.arc(22, 22, 14, 0, Math.PI*2);
      canvas.fill();
      canvas.closePath();

      canvas.fillStyle = '#555';
      canvas.textAlign = 'center';
      canvas.textBaseline = 'middle';
      canvas.font = 'bold 12px sans-serif';

      canvas.fillText(this.options.total, 22, 22, 40);
  }
});
