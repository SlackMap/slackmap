import { ClusterCountsModel } from './cluster-counts-model';
import { GeoCoordinates } from './geo';


export interface ClusterModel {
    rid: string;
    type: number;
    subtype: number;
    coordinates: GeoCoordinates;
    expansion_zoom: number;
    spot_count: number;
    cluster_id: number;
    counts: ClusterCountsModel;
}
