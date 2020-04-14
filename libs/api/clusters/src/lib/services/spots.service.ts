import { Injectable } from '@nestjs/common';
import { OrientService, SpotEntity, spotRow2entity, spotEntity2model } from '@slackmap/api/orient';
import * as geohash from 'ngeohash';
import { ClustersSpotsGetDto, ClustersSpotsGetRequestDto } from '@slackmap/api-client';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BBox } from '@slackmap/gis';

@Injectable()
export class SpotsService {
  constructor(
    private db: OrientService
  ) { }

  selectQuery = [
    '@rid as id',
    'rid',
    'name',
    'description',
    'length',
    'type',
    'subtype',
    'location_path',
    'access',
    'coordinates',
    'shape',
    'viewport',
    'created_at',
    'in_Viewed.size() as views_count',
    '@version as _version'
  ];

  /**
   * bbox: [minlat, minlon, maxlat, maxlon]
   */
  geohash2bbox(geohashString: string): BBox {
    return geohash.decode_bbox(geohashString);
  }

  findByBBox(bbox: BBox): Observable<SpotEntity[]> {
    // console.log('BBOX', bbox)
    return this.db.queryAll<SpotEntity>(
      // `SELECT ${this.selectQuery.join(', ')} FROM Spot WHERE ST_Contains(ST_Buffer(ST_GeomFromText('POINT(0 0)'),10),ST_GeomFromText('POINT(0 0)')) LIMIT 500`,
      `SELECT ${this.selectQuery.join(', ')} FROM Spot WHERE lat BETWEEN :minlat AND :maxlat AND  lon BETWEEN :minlon AND :maxlon`,
      // `SELECT ${this.selectQuery.join(', ')} FROM Spot WHERE lat  :minlat AND lat <= maxlat AND lon >= :minlon AND lon <=:maxlon`,
      // [lat,lon] WITHIN [[:lat,:lon],[:lat2,:lon2]]
      {
        // fetchPlan: 'photo:0 user:0',
        params: {
          minlat: bbox[0],
          minlon: bbox[1],
          maxlat: bbox[2],
          maxlon: bbox[3]
          // lat3: parseFloat(center[1]),
          // lon3: parseFloat(center[0])
        }
      }
    ).pipe(
      map(entities => entities.map(spotRow2entity))
    );
    // [
    //     15.281982421875,    // _southWest.lng
    //     49.95121990866204,  //_southWest.lat
    //     24.071044921875,    // _northEast.lng
    //     54.85131525968609,  //_northEast.lat
    // ]
  }
  getByHash(request: ClustersSpotsGetRequestDto): Observable<ClustersSpotsGetDto> {

    const bbox = this.geohash2bbox(request.hash);
    return this.findByBBox(bbox).pipe(
      map(spots => ({spots: spotEntity2model(spots)}))
    );
    // const spots = [];// mock it
    // return of({
    //   spots: spots
    // });
  }
}
