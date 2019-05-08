
L.LatLngBounds.prototype.toArray = function() {
  return [this._southWest, this._northEast];
};

L.LatLngBounds.prototype.toGeoJSONBBox = function() {
  return [this._southWest.lng, this._southWest.lat, this._northEast.lng, this._northEast.lat];
};

/**
 * log bounds size, for degugging purposes
 * @returns {L.LatLngBounds}
 */
L.LatLngBounds.prototype.logSize = function(label) {
  var height = (this._southWest.lat - this._northEast.lat) * -1,
    width = (this._southWest.lng - this._northEast.lng) * -1;
  // console.log(label||'BOUNDS SIZE:', height, width, '(lat,lon)');
  return this;
};

/**
 * narrow bounds to max width & height
 * @param maxHeight
 * @param maxWidth
 * @returns {L.LatLngBounds}
 */
L.LatLngBounds.prototype.max = function(maxHeight, maxWidth) {
  // (Number) -> LatLngBounds
  let r,
    sw = this._southWest,
    ne = this._northEast,
    height = sw.lat - ne.lat,
    width = sw.lng - ne.lng;

  if (height < maxHeight * -1) {
    r = (height + maxHeight) / 2;
    sw.lat = sw.lat - r;
    ne.lat = ne.lat + r;
  }

  if (width < maxWidth * -1) {
    r = (width + maxWidth) / 2;
    sw.lng = sw.lng - r;
    ne.lng = ne.lng + r;
  }

  return new L.LatLngBounds(new L.LatLng(sw.lat, sw.lng), new L.LatLng(ne.lat, ne.lng));
};

//var s = L.latLngBounds([
//    [-50, -50],
//    [100, 100]
//]).max(20, 20).toBBoxString()
//console.log('str', s);

/**
 * expand bounds to min width & height
 * @param minHeight
 * @param minWidth
 * @returns {L.LatLngBounds}
 */
L.LatLngBounds.prototype.min = function(minHeight, minWidth) {
  // (Number) -> LatLngBounds
  let r,
    sw = this._southWest,
    ne = this._northEast,
    height = sw.lat - ne.lat,
    width = sw.lng - ne.lng;

  if (height > minHeight * -1) {
    r = (height + minHeight) / 2;
    sw.lat = sw.lat - r;
    ne.lat = ne.lat + r;
  }

  if (width > minWidth * -1) {
    r = (width + minWidth) / 2;
    sw.lng = sw.lng - r;
    ne.lng = ne.lng + r;
  }

  return new L.LatLngBounds(new L.LatLng(sw.lat, sw.lng), new L.LatLng(ne.lat, ne.lng));
};

//var s = L.latLngBounds([
//    [-100, -100],
//    [-50, -50]
//]).min(70, 70).logSize().toBBoxString()
//console.log('MIN', s);

L.LatLngBounds.prototype.wrap = function() {
  var min = this.getSouthWest().wrap();
  var max = this.getNorthEast().wrap();
  return L.latLngBounds(min, max);
};

/**
 * custom wrap function
 * limits the bounds lng to max 180
 * orginal wrap function never extends to full widht of the world
 */
L.LatLngBounds.prototype.limit = function() {
  var min = this.getSouthWest().limit();
  var max = this.getNorthEast().limit();
  return L.latLngBounds(min, max);
};
L.LatLng.prototype.limit = function() {
  let lng = this.lng;
  if(lng > 180) {
    lng = 180;
  }
  if(lng < -180) {
    lng = -180;
  }
  return L.latLng([this.lat, lng])
};

L.LatLng.prototype.toArray = function() {
  return [this.lat, this.lng];
};
L.LatLng.prototype.toGeoJSON = function() {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [this.lng, this.lat]
    }
  };
};

L.Map.prototype.fitBbox = function(bbox, options) {
  this.fitBounds(L.latLngBounds([
    [bbox[1], bbox[0]],
    [bbox[3], bbox[2]]
  ]), options)
};
