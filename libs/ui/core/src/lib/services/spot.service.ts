import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { catchError, tap, share, startWith, merge, map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, merge as mergeObservables, EMPTY } from 'rxjs';
import { SportType, ItemType, Rid, ItemSubtype } from '@slackmap/core';
import { CLUSTERS_PATHS, ClusterModel, ClustersClustersGetDto } from '@slackmap/api-client';
import { GeoJSON } from '@slackmap/gis';
import Supercluster from 'supercluster';
import { UiApiService } from '@slackmap/ui/api';
import { ResponseSource, LoadHashResponse } from '../+spot/spot.models';

import { Options, ClusterProperties, PointFeature } from 'supercluster';
import { ClusterCountsModel } from '@slackmap/api-client';

export interface SuperclusterProps {
  spot_count: number;
  counts: ClusterCountsModel;
};

export interface SuperclusterFeatureProps {
  rid: Rid;
  subtype: ItemSubtype;
};

export type SuperclusterFeature = PointFeature<SuperclusterFeatureProps & Partial<ClusterProperties>>;

export const superclusterOptions: Partial<Options<SuperclusterFeatureProps, SuperclusterProps>> = {
  radius: 60,
  maxZoom: 16,
  log: false,
  reduce(acc: SuperclusterProps, props: Readonly<SuperclusterProps>): void {
    for (const name in props.counts) {
      if (props.counts.hasOwnProperty(name)) {
        if (!acc.counts[name]) {
          acc.counts[name] = 0;
        }
        acc.counts[name] += props.counts[name];
      }
    }
    acc.spot_count += props.spot_count;
  }
}


@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(
    private api: UiApiService,
    private cache: CacheService
  ) { }
  hashes: { [s: string]: any } = {};

  private reloadSupercluster$ = new Subject<any>();

  /**
   * Create supercluster
   * and load all clusters for 16th zoom
   */
  public supercluster$: Observable<any> = of(1).pipe(
    merge(this.reloadSupercluster$),
    /**
     * fetch clusters from serer, use cache
     */
    switchMap((code) => {
      const request = this.api.clustersGet({
        bbox: '-180,-90,180,90',
        zoom: 16,
        sport: SportType.SLACKLINE
      });
      const key = CLUSTERS_PATHS.clustersGet();
      const ttl = 60 * 60 * 1;
      // return of(fixtures.clusters);
      return this.cache.loadRequestOrCache<ClustersClustersGetDto>(key, request).pipe(
        map(res => res.clusters),
        // map(res => fixtures.clusters),
        catchError(err => EMPTY)
        // catchError(err => of(fixtures.clusters))
      );
    }),
    /**
     * create supercluster instance
     */
    map<ClusterModel[], Supercluster>((clusters) => {
      const features = clusters.map<SuperclusterFeature>(_cluster => {
        return {
          type: 'Feature',
          properties: {
            counts: _cluster.counts,
            subtype: _cluster.subtype,
            spot_count: _cluster.spot_count,
            expansion_zoom: _cluster.expansion_zoom,
            rid: _cluster.rid
          },
          geometry: {
            type: 'Point',
            coordinates: _cluster.coordinates
          }
        };
      });

      const cluster = new Supercluster(superclusterOptions);
      cluster.load(features);
      return cluster;
    }),
    catchError(err => {
      console.error('supercluster$ ERROR', err);
      return EMPTY;
    }),
    /**
     * share the same instance to all subscribers
     */
    shareReplay()
  );

  loadSpotsByHash(layer: SportType, hash: string): Observable<LoadHashResponse> {
    if (this.hashes[hash]) {
      return this.hashes[hash];
    }

    const request$ = this.api.clustersSpotsGet({ hash: hash, sport: SportType.SLACKLINE }).pipe(

      map((data) => {
        // save resonse to cache
        this.cache.set(name, {
          layer,
          hash,
          source: ResponseSource.STORAGE,
          timestamp: Date.now(),
          data
        });
        // return event instance
        return {
          layer,
          hash,
          source: ResponseSource.SERVER,
          timestamp: Date.now(),
          data
        };
      }),
      catchError((error) => {
        console.log('ERR', error);
        return of({
          layer,
          hash,
          source: ResponseSource.SERVER,
          timestamp: Date.now(),
          error
        });
      })
    );
    const key = `spots/${layer}/${hash}`;
    // const cache$ = this.cache.get(key);
    this.hashes[hash] = mergeObservables(
      // cache$,
      request$
    ).pipe(
      startWith({
        layer,
        hash,
        loading: true
      }),
      tap(null, null, () => {
        delete this.hashes[hash];
      }),
      share()
    );
    return this.hashes[hash];
  }


  /**
   *
   * @param bbox geojson.BBox
   * @param zoom
   */
  getClusters(layer: SportType, bbox: GeoJSON.BBox, zoom: number): Observable<LoadHashResponse> {
    return <any>this.supercluster$.pipe(
      map((scluster) => {
        const clusters = scluster.getClusters(bbox, zoom).map(cluster => {
          if (cluster.properties.cluster) {
            cluster.properties.expansion_zoom = scluster.getClusterExpansionZoom(cluster.properties.cluster_id, zoom);
          }
          const c: ClusterModel = {
            rid: cluster.properties.rid || '',
            type: ItemType.CLUSTER,
            subtype: !!cluster.properties.cluster ? ItemSubtype.CLUSTER_CLUSTER : ItemSubtype.CLUSTER_SPOT,
            coordinates: cluster.geometry,
            expansion_zoom: cluster.properties.expansion_zoom || 17,
            spot_count: cluster.properties.spot_count || 1,
            cluster_id: cluster.properties.cluster_id || 0,
            counts: cluster.properties.counts
          };

          return c;
        });

        return {
          layer,
          hash: 'clusters',
          source: ResponseSource.STORAGE,
          timestamp: Date.now(),
          data: {
            spots: clusters
          }
        };
      }),
      catchError(err => {
        console.log('getClusters() ERROR', err);
        return EMPTY;
      })
    );
  }
  public reloadSupercluster() {
    this.reloadSupercluster$.next(2);
  }
}
