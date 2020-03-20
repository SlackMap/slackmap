import { Injectable, Inject, Logger } from '@nestjs/common';
import Supercluster from 'supercluster';
import { ClusterSubtype, ItemRidPrefix, ItemType, SpotSubtype } from '@slackmap/core';
import { OrientService, SpotEntity, ClusterEntity, ClusterCountsEntity } from "@slackmap/api/orient";
import { ClusterOptions } from '../models';
import { map, reduce, takeUntil, shareReplay, filter, take, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

export interface Feature {
  name: string;
  properties: {
    rid: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

@Injectable()
export class ClustersService {
  public options: any; // options for supercluster

  destroy$ = new Subject();
  private readonly logger = new Logger('OrientService');

  loadSpots$ = this.db.query<SpotEntity>(`SELECT rid, lat, lon, subtype FROM Spot`).pipe(
    map<SpotEntity, Feature>((spot) => {
      return {
        name: 'Feature',
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
    reduce<Feature, Feature[]>((acc, v) => {
      acc.push(v);
      return acc as any;
    }, []),
    // tap(v=>console.log('V',v.length), err => console.log('ERR'), () => console.log('complete'))
  )
  cluster$$ = new BehaviorSubject(null);
  cluster$ = this.cluster$$.pipe(
    switchMap(() => this.loadSpots$),
    map(spots => {
      const cluster = new Supercluster(this.options);
      cluster.load(spots as any); // TODO fix any typing
      return cluster;
    }),
    takeUntil(this.destroy$),

    // tap(v=>console.log('V1',v), err => console.log('ERR1'), () => console.log('complete1')),
    shareReplay({
      bufferSize: 1,
      refCount: false // this connection wil live even without subscribers
    }),
    // tap(v=>console.log('V2',v), err => console.log('ERR2'), () => console.log('complete2')),
  );

  constructor(
    @Inject(ClusterOptions) options: Partial<ClusterOptions> = {},
    private db: OrientService
  ) {
    this.options = Object.assign(
      {
        radius: 60,
        maxZoom: 16,
        log: false,
        initial: function () {
          return {
            counts: {}
          };
        },
        map: function (props) {
          // console.log('MAP', props);
          let name = SpotSubtype[props.subtype];
          if (!name) {
            name = 'area';
          }
          name = name.toLocaleLowerCase();
          const counts: any = {};
          counts[name] = 1;
          return {
            counts
          };
        },
        reduce: function (acc, props) {
          // console.log('REDUCE', accumulated, props);
          for (const name in props.counts) {
            if (props.counts.hasOwnProperty(name)) {
              if (!acc.counts[name]) {
                acc.counts[name] = 0;
              }
              acc.counts[name] += props.counts[name];
            }
          }
        }
      },
      options
    );
  }

  /**
   * query the index for clusters
   *
   * @param bbox geo json bbox
   * @param zoom
   * @returns {Promise<void>}
   */
  query(bbox, zoom): Observable<ClusterEntity[]> {

    // parse
    zoom = parseInt(zoom, 10);
    if (!zoom && zoom !== 0) {
      return of([]);
    }

    return this.cluster$.pipe(
      map(index => {
        const clusters = index.getClusters(bbox, zoom);

        // add extra stuff and convert Feature to Cluster
        return clusters.map(cluster => {
          if (cluster.properties.cluster) {
            cluster.properties.expansion_zoom = index.getClusterExpansionZoom(cluster.properties.cluster_id);
          }
          const c: ClusterEntity = {
            rid: cluster.properties.rid || '',
            type: ItemType.CLUSTER,
            subtype: !!cluster.properties.cluster ? ClusterSubtype.CLUSTER : ClusterSubtype.SPOT,
            coordinates: cluster.geometry,
            expansion_zoom: cluster.properties.expansion_zoom || 17,
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

  createCounts(cluster): ClusterCountsEntity {

    if (cluster.properties.rid) {
      let name = SpotSubtype[cluster.properties.subtype];
      if (!name) {
        name = 'area';
      }
      const counts: ClusterCountsEntity = {};
      name = name.toLocaleLowerCase();
      counts[name] = 1;
      return counts;
    } else {
      return cluster.properties.counts;
    }
  }

}
