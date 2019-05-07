import { Injectable, Inject } from '@nestjs/common';
import Supercluster from 'supercluster';
import { ClusterSubtype, ItemRidPrefix, ItemType, SpotSubtype } from '@slackmap/core';
import { SpotEntity, ClusterEntity, ClusterCountsEntity } from '../entities';
import { OrientService } from "@slackmap/api/orient";
import { ClusterOptions } from './cluster-options';

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
export class ClusterService {
  public spots: Array<Feature>; // loades spots from db
  public index: any; // supercluster instance
  public options: any; // options for supercluster
  public loading: Promise<any>; // promise if right now the cluster is in progres of loading spots

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
  async query(bbox, zoom): Promise<Array<ClusterEntity>> {
    // parse
    zoom = parseInt(zoom, 10);
    if (!zoom && zoom !== 0) {
      return [];
    }

    // if index is not loaded yet, do it now
    if (!this.index) {
      await this.load();
    }

    const clusters = this.index.getClusters(bbox, zoom);

    // add extra stuff and convert Feature to Cluster
    return clusters.map(cluster => {
      if (cluster.properties.cluster) {
        cluster.properties.expansion_zoom = this.index.getClusterExpansionZoom(cluster.properties.cluster_id, parseInt(zoom, 10));
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

  /**
   * used internally to load spots
   * returns single promise instance for all calls to prevent multiple loads for multiple requests
   *
   * @returns {Promise<any>}
   */
  load() {
    if (!this.loading) {
      this.loading = this.loadSpots();
    }
    return this.loading;
  }

  /**
   * loads the spots from db and creates cluster instance with it
   * returns new promise for each call
   * used internally by load()
   *
   * @returns {Promise<void>}
   */
  private async loadSpots() {
    const db = await this.db.acquire();
    const entities = await db.query<SpotEntity>(`SELECT rid, lat, lon, subtype FROM Spot`).all();

    this.spots = entities.map<Feature>((spot) => {
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
    });
    console.log('SPOTS', this.spots);
    console.log('OPTIONS', this.options);
    const cluster = new Supercluster(this.options);
    cluster.load(this.spots);
    this.index = cluster;
    this.loading = null;
  }
}
