import * as geohash from 'ngeohash';

/**
 * converts geojson bbox to leaflet bounds
 *
 * @param bbox geojeson bbox [minlat, minlon, maxlat, maxlon]
 * @returns leaflet bounds array [[54.559322, -5.767822], [56.1210604, -3.021240]]
 */
export function bbox2bounds(bbox) {
  return [[bbox[0], bbox[1]], [bbox[2], bbox[3]]];
}

/**
 * converts geohash string to leaflet bounds (array of coords)
 *
 * @param hash string of geohash
 */
export function geohash2bounds(hash) {
  const bbox = geohash.decode_bbox(hash);
  return bbox2bounds(bbox);
}
