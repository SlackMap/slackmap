import { ItemSubtype, Rid } from '@slackmap/core';
import { Options, ClusterProperties, PointFeature } from 'supercluster';
import { ClusterCountsModel } from '../models';

export interface SuperclusterProps {
  counts: ClusterCountsModel;
};

export interface SuperclusterFeatureProps {
  rid: Rid;
  subtype: ItemSubtype;
};

export type SuperclusterFeature = PointFeature<SuperclusterFeatureProps & Partial<ClusterProperties>>;

export const superclusterOptions : Partial<Options<SuperclusterFeatureProps, SuperclusterProps>> = {
  radius: 60,
  maxZoom: 16,
  log: false,
  map(props: SuperclusterFeatureProps): SuperclusterProps {
    return {
      counts: {
        [props.subtype]: 1
      }
    };
  },
  reduce(acc: SuperclusterProps, props: Readonly<SuperclusterProps>): void {
    for (const name in props.counts) {
      if (props.counts.hasOwnProperty(name)) {
        if (!acc.counts[name]) {
          acc.counts[name] = 0;
        }
        acc.counts[name] += props.counts[name];
      }
    }
  }
}
