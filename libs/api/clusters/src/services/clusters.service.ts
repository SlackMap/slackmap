import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Supercluster from 'supercluster';
import { ItemType, ItemSubtype, RIDS, SportType } from '@slackmap/core';
import { ClusterCountsModel, ClusterModel } from '@slackmap/api-client';
import { OrientService, SpotEntity } from "@slackmap/api/orient";
import { superclusterOptions, SuperclusterFeature } from '../models';
import { map, reduce, takeUntil, take } from 'rxjs/operators';
import { Observable, of, Subject, ReplaySubject } from 'rxjs';
const logger = new Logger('ClustersService');

@Injectable()
export class ClustersService implements OnModuleDestroy, OnModuleInit {

  private clusters: { [key in SportType]?: ReplaySubject<Supercluster> } = {};

  destroy$ = new Subject();

  constructor(
    private db: OrientService
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
            subtype: !!cluster.properties.cluster ? ItemSubtype.CLUSTER_CLUSTER : ItemSubtype.CLUSTER_SPOT,
            coordinates: cluster.geometry.coordinates,
            expansion_zoom,
            spot_count: cluster.properties.point_count || 1,
            cluster_id: cluster.properties.cluster_id || 0,
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
    // TODO after addding sport property to Spot entity, add it in WHERE section to this SQL query
    return this.db.query<SpotEntity>(`SELECT rid, lat, lon, subtype FROM Spot`).pipe(
      map<SpotEntity, SuperclusterFeature>((spot) => {
        return {
          type: 'Feature',
          properties: {
            rid: spot.rid || 's0',
            subtype: spot.subtype
          },
          geometry: {
            type: 'Point',
            coordinates: [spot.lon || 0, spot.lat || 0]
          }
        };
      }
      ),
      reduce<SuperclusterFeature, SuperclusterFeature[]>((acc, v) => {
        acc.push(v);
        return acc;
      }, []),
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
