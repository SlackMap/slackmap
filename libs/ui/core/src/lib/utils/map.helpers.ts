import {ItemRids, ItemType} from '@slackmap/core';
import {GeojsonBbox} from '@slackmap/api-client';

/**
 * converts array of latlng's to string
 *
 * @param array
 * @return string
 */
// export function shapeArr2str(arr) {
//   var data = [];
//   for (var i = 0; i < arr.length; i++) {
//     data.push(arr[i].join(','));
//   }
//   return data.join('_');
// }

/**
 * converts string to array of latlng's arrays
 *
 * @param string
 * @return array
 */
// export function str2shapeArr(str) {
//   var a,
//     arr = str.split('_');
//   var data = [];
//   for (var i = 0; i < arr.length; i++) {
//     a = arr[i].split(',');
//     data.push([parseFloat(a[0]), parseFloat(a[1])]);
//   }
//   return data;
// }

/**
 * converts string to array of L.LatLng() objects
 *
 * @param string
 * @return array
 */
// export function str2latlngs(str) {
//   var arr = str.split('_');
//   var p,
//     data = [];
//   for (var i = 0; i < arr.length; i++) {
//     p = arr[i].split(',');
//     data.push(new L.LatLng(p[0], p[1]));
//   }
//   return data;
// }

/**
 * returns item geojson bounding box
 *
 * @param item
 * @returns GeojsonBbox
 */
export function getItemBounds(item: any): GeojsonBbox {
  const data: any = {};
  if (item.rid === ItemRids.WORLD) {
    return [-180, -90, 180, 90];
  } else if (item.type === ItemType.SPOT) {
    return geojsonBbox(item.shape);
  }
  return null;
}

/**
 * focuses the item on the view
 *
 * @param item
 * @returns {Map}
 */
// export function fitItems(map: L.Map, items: any[]) {
//   if (!items || !items.length) {return; }
//   if (items[0].type === ItemType.CLUSTER) {
//     map.setView([items[0].coordinates.coordinates[1], items[0].coordinates.coordinates[0]], items[0].expansion_zoom);
//     return;
//   }

//   const options = {
//     maxZoom: 19,
//     padding: [10, 10]
//   };
//   const bbox = bboxes2bbox(items.map(getItemBounds).filter(bbox => !!bbox));
//   map.fitBbox(bbox, options);
// }

/**
 * fit bounds if bounds are out of current view box
 * and new zoom after bounds is different from current zoom
 *
 * so we can avoid small map moves when selecting spots which are very close each other
 *
 * @param bounds
 * @param options
 * @param item
 * @returns {*}
 */
// export function isOutOfCurrentBounds(map: L.Map, bounds: L.LatLngBounds) {
//   let newZoom = this.getBoundsZoom(bounds);
//   const zoom = this.getZoom();

//   // this 19 number should be taken from config, it's max zoom when doing fitBounds
//   if (newZoom > 19) {
//     newZoom = 19;
//   }
//   let reload = newZoom !== zoom;

//   // but reload only when in item zoom and zoom difference is grater then 2
//   if (zoom >= 17 && Math.abs(newZoom - zoom) <= 2) {
//     reload = false;
//   }

//   const mapBounds = this.getBounds();
//   if (reload || !mapBounds.contains(bounds)) {
//     return true;
//   }
//   return false;
// }

/**
 * get bbox from array of bbox
 */
export function bboxes2bbox(bboxes: GeojsonBbox[]) {
  const bbox = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, ];
  return bboxes.reduce(function (prev, box) {
    return [
      Math.min(box[0], prev[0]),
      Math.min(box[1], prev[1]),
      Math.max(box[2], prev[2]),
      Math.max(box[3], prev[3])
    ];
  }, bbox);
}

/**
 * get bbox from geojson features
 */
export function geojsonBbox(gj) {
  let coords, bbox;
  if (!gj.hasOwnProperty('type')) {return; }
  coords = getCoordinatesDump(gj);
  bbox = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, ];
  return coords.reduce(function (prev, coord) {
    return [
      Math.min(coord[0], prev[0]),
      Math.min(coord[1], prev[1]),
      Math.max(coord[0], prev[2]),
      Math.max(coord[1], prev[3])
    ];
  }, bbox);
}

function getCoordinatesDump(gj) {
  let coords;
  if (gj.type === 'Point') {
    coords = [gj.coordinates];
  } else if (gj.type === 'LineString' || gj.type === 'MultiPoint') {
    coords = gj.coordinates;
  } else if (gj.type === 'Polygon' || gj.type === 'MultiLineString') {
    coords = gj.coordinates.reduce(function (dump, part) {
      return dump.concat(part);
    }, []);
  } else if (gj.type === 'MultiPolygon') {
    coords = gj.coordinates.reduce(function (dump, poly) {
      return dump.concat(poly.reduce(function (points, part) {
        return points.concat(part);
      }, []));
    }, []);
  } else if (gj.type === 'Feature') {
    coords = getCoordinatesDump(gj.geometry);
  } else if (gj.type === 'GeometryCollection') {
    coords = gj.geometries.reduce(function (dump, g) {
      return dump.concat(getCoordinatesDump(g));
    }, []);
  } else if (gj.type === 'FeatureCollection') {
    coords = gj.features.reduce(function (dump, f) {
      return dump.concat(getCoordinatesDump(f));
    }, []);
  }
  return coords;
}

// export function moveToBounds(map: L.Map, bounds: L.LatLngBounds, options) {
//   if (this._moving) return;
//   let fromPos = this.getCenter();
//   let toPos = bounds.getCenter();

//   var distance = fromPos.distanceTo(toPos);
//   // console.log('DISTANCE', distance, oldItem)
//   if (distance < 1000) {
//     return this.flyToBounds(bounds, options);
//   }

//   this._moving = true;
//   let line = L.polyline([fromPos, toPos]).addTo(this);
//   this.fitBounds(line.getBounds(), options);

//   let marker = L.animatedMarker(line.getLatLngs(), {
//     icon: L.icon({
//       iconUrl: '/assets/images/marker-bike-green-shadowed.png',
//       iconSize: [25, 39],
//       iconAnchor: [12, 39],
//       shadowUrl: null
//     }),
//     distance: 2000,
//     interval: 1000,
//     autoStart: true,
//     onEnd: () => {
//       this.removeLayer(marker);
//       this.removeLayer(line);
//       this._moving = false;
//       this.fitBounds(bounds, options);
//     }
//   }).addTo(this);
// }
