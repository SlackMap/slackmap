L.slackmap = L.slackmap || {};

L.slackmap.LocationMarker = class LocationMarker extends L.Marker {

  constructor(item, options) {
    super(L.GeoJSON.coordsToLatLng(item.coordinates.coordinates), options);
    this.item = item;
    var html, cls;
    if (item.subtype === 102) {
      html = `
                        <span class="label-mask"></span>
                        <span class="badge">
                            <img src="/assets/uploads/flags/24/${item.code}.png" />
                            <!-- <i class="icon-pin"></i> ${item.spots_count || 0} -->
                            <!-- <i class="icon-user"></i> ${item.users_count || 0} -->
                        </span>
                    `;
      cls = 'item-label item-country-label';
    } else {
      html = `
                        <span class="label-mask"></span>
                        <span class="badge">
                            ${item.name || ''}
                        </span>
                    `;
      cls = 'item-label item-location-label';
    }

    this.options.icon = new L.DivIcon({
      html: html,
      className: cls
    });

    if (item.shape) {
      this.shapeLayer = L.geoJSON(item.shape, {
        style: data => {
          return {
            color: 'black',
            weight: 1,
            opacity: 0.7,
            fill: true,
            fillColor: 'black', //same as color by default
            fillOpacity: 0.1,
            clickable: true
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            // mouseover: (e) => {
            //     var layer = e.target;
            //
            //     layer.setStyle({
            //         weight: 2,
            //         opacity: 1,
            //         color: 'black',
            //         //dashArray: '',
            //         //fillOpacity: 0.7
            //     });
            //
            //     if (!L.Browser.ie && !L.Browser.opera) {
            //         layer.bringToFront();
            //     }
            //
            // },
            // mouseout: (e) => {
            //     var layer = e.target;
            //     self.$$shape.resetStyle(e.target);
            // },
            click: function(e) {
              this._map.fire('item-click', {item: item});
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
