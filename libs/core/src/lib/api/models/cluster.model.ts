import { ClusterCountsModel } from './cluster-counts-model';
import { Position } from './geojson';


export interface ClusterModel {
    rid: string;
    type: number;
    subtype: number;
    coordinates: Position;
    expansion_zoom: number;
    spot_count: number;
    cluster_id: number;
    counts: ClusterCountsModel;
}
