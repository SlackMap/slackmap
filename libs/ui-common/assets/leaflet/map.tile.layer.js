L.slackmap = L.slackmap || {};
L.slackmap.MapTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${coords.z}/${coords.x}/${coords.y}.png`
    },
    getAttribution: function() {
        return `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
               contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>
               `
    },
    onAdd: function(map) {
      L.TileLayer.prototype.onAdd.call(this, map);
  }
});

L.slackmap.mapTileLayer = function() {
    return new L.slackmap.MapTileLayer();
}
