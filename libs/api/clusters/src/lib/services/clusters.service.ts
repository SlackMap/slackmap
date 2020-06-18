import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as Supercluster from 'supercluster';
import { ItemType, ItemSubtype, RIDS, SportType, ClusterSubtype } from '@slackmap/core';
import { ClusterCountsModel, ClusterModel } from '../models';
import { superclusterOptions, SuperclusterFeature } from '../models';
import { map, reduce, takeUntil, take, switchMap } from 'rxjs/operators';
import { Observable, of, Subject, ReplaySubject, from, EMPTY } from 'rxjs';
import { SpotRepository, SpotEntity } from '@slackmap/api/spot/data';
import { fromStream } from '@slackmap/api/common';

const logger = new Logger('ClustersService');

@Injectable()
export class ClustersService implements OnModuleDestroy, OnModuleInit {

  private clusters: { [key in SportType]?: ReplaySubject<Supercluster> } = {};

  destroy$ = new Subject();

  constructor(
    private spotRepository: SpotRepository
  ) {}

  /**
   * query the index for clusters
   *
   * @param bbox geo json bbox
   * @param zoom
   * @returns {Promise<void>}
   */
  query(sport: SportType, bbox, zoom): Observable<ClusterModel[]> {

    // parse
    zoom = parseInt(zoom, 10);
    if (!zoom && zoom !== 0) {
      return of([]);
    }

    return this.getCluster(sport).pipe(
      map(index => {
        const clusters = index.getClusters(bbox, zoom);
        // add extra stuff and convert Feature to Cluster
        return clusters.map((cluster: SuperclusterFeature) => {
          let expansion_zoom = 17;
          if (cluster.properties.cluster) {
            expansion_zoom = index.getClusterExpansionZoom(cluster.properties.cluster_id);
          }
          const c: ClusterModel = {
            rid: cluster.properties.rid || '',
            type: ItemType.CLUSTER,
            subtype: !!cluster.properties.cluster ? ClusterSubtype.CLUSTER : ClusterSubtype.SPOT,
            position: cluster.geometry.coordinates,
            expansionZoom: expansion_zoom,
            spotCount: cluster.properties.point_count || 1,
            clusterId: cluster.properties.cluster_id || 0,
            counts: this.createCounts(cluster)
          };

          return c;
        });
      }),
      take(1),
    );

  }

  createCounts(cluster): ClusterCountsModel {
    if (cluster.properties.rid) {
      return {
        [cluster.properties.subtype]: 1
      };
    } else {
      return cluster.properties.counts;
    }
  }

  reloadCluster(sport: SportType) {
    if (this.clusters[sport]) {
      delete this.clusters[sport];
    }
    return this.getCluster(sport);
  }

  getCluster(sport: SportType): Observable<Supercluster> {
    if (this.clusters[sport]) {
      return this.clusters[sport].asObservable();
    }
    this.clusters[sport] = new ReplaySubject(1);
    this.loadPointFeaturesBySportType(sport).pipe(
      map(spots => {
        const cluster = new Supercluster(superclusterOptions);
        cluster.load(spots);
        return cluster;
      }),
      takeUntil(this.destroy$),
    ).subscribe({
      next: cluster => this.clusters[sport].next(cluster),
      error: (err: Error) => {
        logger.error(err, err.stack);
        this.clusters[sport].complete();
        delete this.clusters[sport];
      }
    });
    return this.clusters[sport].asObservable();
  }

  /**
   * Loads spots from the DB and returns features ready to insert into supercluster
   *
   * @param sport SportType
   */
  loadPointFeaturesBySportType(sport: SportType): Observable<SuperclusterFeature[]> {

    return from(this.spotRepository.getForClustering(sport)).pipe(
      // switchMap(cursor => fromStream<SpotEntity>(cursor.asStream())),
      map<SpotEntity[], SuperclusterFeature[]>((spots) => {
        return spots.map(spot => ({
          type: 'Feature',
          properties: {
            rid: spot.rid || 's0',
            subtype: spot.subtype,
          },
          geometry: {
            type: 'Point',
            coordinates: spot.position || [0, 0]
          }
        }));
      }
      ),
      // reduce<SuperclusterFeature, SuperclusterFeature[]>((acc, v) => {
      //   acc.push(v);
      //   return acc;
      // }, []),
    )
  }

  onModuleInit() {
    // TODO do live query and reload clusters on new spots
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
