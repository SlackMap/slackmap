L.slackmap = L.slackmap || {};
L.slackmap.SatelliteGoogleTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
      return `https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x=${coords.x}&y=${coords.y}&z=${coords.z}`
    },
    getAttribution: function() {
        return `<div style="position: relative; padding-right: 6px; padding-left: 6px; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;"><a style="text-decoration: none; cursor: pointer; display: none;">Dane mapy</a><span style="">Zdjęcie satelitarne ©2018 , CNES / Airbus, DigitalGlobe, MGGP Aero</span></div>`
    },
    onAdd: function(map) {
      L.TileLayer.prototype.onAdd.call(this, map);
  }
});

L.slackmap.satelliteGoogleTileLayer = function() {
    return new L.slackmap.SatelliteGoogleTileLayer();
}
