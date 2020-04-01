import { Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from './ui-api-tokens';
import { Observable } from 'rxjs';
import { ConfigPaths, CLUSTERS_PATHS, ClustersClustersGetRequestDto, ClustersClustersGetDto, SpotSpotsGetRequestDto, SpotSpotsGetDto, ConfigGetResponseDto } from '@slackmap/api-client';

@Injectable({ providedIn: 'root' })
export class UiApiService {

  constructor(
    protected httpClient: HttpClient,
    @Inject(API_HOST) protected basePath,
  ) {}

  public getConfig(): Observable<ConfigGetResponseDto> {
    return this.httpClient.get<ConfigGetResponseDto>(
      `${this.basePath}/${ConfigPaths.CONFIG}`
    );
  }

  /**
   * query clusters by bbox
   */
  public clustersGet(params: ClustersClustersGetRequestDto): Observable<ClustersClustersGetDto> {
    return this.httpClient.get<ClustersClustersGetDto>(
      `${this.basePath}/${CLUSTERS_PATHS.clustersGet()}`,
      {
        params: <any>params,
      },
    );
  }

  /**
   * query clusters by bbox
   */
  public clustersSpotsGet(params: SpotSpotsGetRequestDto): Observable<SpotSpotsGetDto> {
    return this.httpClient.get<SpotSpotsGetDto>(
      `${this.basePath}/${CLUSTERS_PATHS.spotsGet()}`,
      {
        params: <any>params,
      },
    );
  }
}
