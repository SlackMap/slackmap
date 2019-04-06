import {Injectable} from '@angular/core';
import {CacheService} from './cache.service';
import {catchError, tap, share, startWith, merge, map, shareReplay, switchMap} from 'rxjs/operators';
import {Observable, of, empty, Subject, merge as mergeObservables} from 'rxjs';
import {LayerType, ItemType, ClusterSubtype} from '@slackmap/core';
import supercluster from 'supercluster';
import {GeojsonBbox, ResponseSource, ClusterModel, ClustersGetResponseDto, LoadHashResponse} from '@slackmap/core/api';
import { ApiService } from './api.service';
// import {clusters as fixtures} from '@app/map/clusters';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {

  constructor(
    private api: ApiService,
    private cache: CacheService
  ) {}
  hashes: {[s: string]: any} = {};

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
        zoom: 16
      });
      const key = 'clusters/clusters';
      const ttl = 60 * 60 * 1;
      return this.cache.loadRequestOrCache<ClustersGetResponseDto>(key, request).pipe(
        map(res => res.clusters),
        // map(res => fixtures.clusters),
        catchError(err => empty())
      );
    }),
    /**
     * create supercluster instance
     */
    map((clusters: ClusterModel[]) => {
      const features = clusters.map<any>(_cluster => {
        return {
          name: 'Feature',
          properties: {
            counts: _cluster.counts,
            spot_count: _cluster.spot_count,
            expansion_zoom: _cluster.expansion_zoom,
            rid: _cluster.rid
          },
          geometry: _cluster.coordinates
        };
      });
      const options = {
        radius: 60,
        maxZoom: 16,
        log: false,
        initial: function () {
          return {
            spot_count: 0,
            counts: {}
          };
        },
        reduce: function (acc, props) {
          for (const name in props.counts) {
            if (props.counts.hasOwnProperty(name)) {
              if (!acc.counts[name]) {
                acc.counts[name] = 0;
              }
              acc.counts[name] += props.counts[name];
            }
          }
          acc.spot_count += props.spot_count;
          return acc;
        }
      };
      const cluster = supercluster(options);
      cluster.load(features);
      return cluster;
    }),
    catchError(err => {
      console.log('supercluster$ ERROR', err);
      return empty();
    }),
    /**
     * share the same instance to all subscribers
     */
    shareReplay()
  );

  loadSpotsByHash(layer: LayerType, hash: string): Observable<LoadHashResponse> {
    if (this.hashes[hash]) {
      return this.hashes[hash];
    }

    const request$ = this.api.clustersSpotsGet({hash}).pipe(

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
   * @param bbox GeojsonBbox
   * @param zoom
   */
  getClusters(layer: LayerType, bbox: GeojsonBbox, zoom: number): Observable<LoadHashResponse> {
    return this.supercluster$.pipe(
      map((scluster) => {
        const clusters = scluster.getClusters(bbox, zoom).map(cluster => {
          if (cluster.properties.cluster) {
            cluster.properties.expansion_zoom = scluster.getClusterExpansionZoom(cluster.properties.cluster_id, zoom);
          }
          const c: ClusterModel = {
            rid: cluster.properties.rid || '',
            type: ItemType.CLUSTER,
            subtype: !!cluster.properties.cluster ? ClusterSubtype.CLUSTER : ClusterSubtype.SPOT,
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
        return empty();
      })
    );
  }
  public reloadSupercluster() {
    this.reloadSupercluster$.next(2);
  }
}
