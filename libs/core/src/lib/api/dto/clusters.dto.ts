import { ClusterModel } from '../models';

export class ClustersGetRequestDto {
  bbox: string;
  zoom: number;
}
export class ClustersGetResponseDto {
  clusters: ClusterModel[];
}

export class ClustersSpotsGetRequestDto {
  hash: string;
}

export class ClustersSpotsGetResponseDto {
  clusters: ClusterModel[];
}
