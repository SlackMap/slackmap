# GIS Knowledge Base

## LatLon vs LonLat explained

http://gis.stackexchange.com/questions/54065/leaflet-geojson-coordinate-problem

When talking about geographic locations, we usually use Lat-long.

When dealing with Cartesian coordinate geometry, we generally use X-Y.
Where the X represents the longitude and Y represents the Latitude.

The GeoJSON standard says that for any point, the first parameter is the X Coordinate (i.e. Longitude) and second parameter is the Y coordinate (i.e. Latitude);

## latitude explained

- lat
- Y coordinate
- from -90 to 90 degrees
- goes from east to west
- 0 degree is on equator
- also known as parallels, be course are all parallel to each other (unlike longitudes)
- 1 degree has 69 miles sizes
- 1 degree has 60 minutes and 1 minute has 60 seconds
- 23.5N is on tropic of cancer
- 23.5S is tropic of capricorn
- all between is know as tropics
- 66.5N is arctic circle
- 66.5S is antarctic circle
- all between that and tropics has 4 seasons

## longitude explained

- lon
- X coordinate
- from -180 to 180 degrees
- goes from north to south
- 0 degree goes through Greenwich, UK
- not parallel, goes to one point on the pols

### Coordinates

```text
               north
               90             NE
               lat
               Y
                |
                |
                |
west            |                east
--------------------------------
-180            |                 180
                |
                |
                |
SW            south
               -90
```

## Bounding Box explained

http://wiki.openstreetmap.org/wiki/Bounding_Box

**south west** = MIN lat/lon

**north east** = MAX lat/lon

In SlackMap we use **GeoJSON** format of **BBox**:

```typescript
let bbox = [southWest.lng, southWest.lat, northEast.lng, northEast.lat];
```

or if it's a string:

```ts
let bbox = "southWest.lng,southWest.lat,northEast.lng,northEast.lat";
```

sometimes you can find this kind of notation, and it's the same

```ts
[westLng, southLat, eastLng, northLat]
```

### ngeohash.decode_bbox(hash)

Returned value: [minlat, minlon, maxlat, maxlon]

### BBox type definition

```typescript
export type BBox = [number, number, number, number] | [number, number, number, number, number, number];
```

### More than you ever wanted to know about GeoJSON

http://www.macwright.org/2015/03/23/geojson-second-bite.html

https://tools.ietf.org/html/rfc7946#section-5
