# SlackMap

Welcome to SlackMap project, this monorepo contains backend and frontend code. Angular + Nest + OrientDB.

We use [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

<a href="https://slackmap.com" target="_blank"><img src="https://slackmap.com/assets/logo.svg"></a>

## SlackMap CLI

Run development CLI

```bash
# after cloning the repo, install dependencies
npm install

# link local bin to your global paths
npm link

# now you can use SlackMap CLI
sm
```

## OrientDB

### Local development

Download the database and run it locally

```bash
sm orient:download
sm orient:switch
npm run db
```

### Server deployment

```bash
# test deploy
npm run db:deploy test deploy
# test rollback
npm run db:deploy test rollback

# prod deploy
npm run db:deploy prod deploy
# prod rollback
npm run db:deploy prod rollback
```

### Using Docker

TODO

```bash
docker run -d --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=root orientdb:2.2.37-spatial
```

## Nx Workspaces

This project was generated using [Nx](https://nx.dev).

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@slackmap/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## Knowledge Base

### LatLon vs LonLat explained

http://gis.stackexchange.com/questions/54065/leaflet-geojson-coordinate-problem

When talking about geographic locations, we usually use Lat-long.

When dealing with Cartesian coordinate geometry, we generally use X-Y.
Where the X represents the longitude and Y represents the Latitude.

The GeoJSON standard says that for any point, the first parameter is the X Coordinate (i.e. Longitude) and second parameter is the Y coordinate (i.e. Latitude);

### latitude explained

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

### longitude explained

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

### Bounding Box explained

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

#### ngeohash.decode_bbox(hash)

Returned value: [minlat, minlon, maxlat, maxlon]

#### BBox type definition

```typescript
export type BBox = [number, number, number, number] | [number, number, number, number, number, number];
```

#### More than you ever wanted to know about GeoJSON

http://www.macwright.org/2015/03/23/geojson-second-bite.html

https://tools.ietf.org/html/rfc7946#section-5
