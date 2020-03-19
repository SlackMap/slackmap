import { Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from './ui-api-tokens';
import { Observable } from 'rxjs';
import { ConfigPaths, ClustersPaths, ClustersClustersGetRequestDto, ClustersClustersGetResponseDto, SpotSpotsGetRequestDto, SpotSpotsGetResponseDto, ConfigGetResponseDto } from '@slackmap/api-client';

@Injectable({ providedIn: 'root' })
export class ApiService {

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
  public clustersGet(params: ClustersClustersGetRequestDto): Observable<ClustersClustersGetResponseDto> {
    return this.httpClient.get<ClustersClustersGetResponseDto>(
      `${this.basePath}/${ClustersPaths.CLUSTERS}`,
      {
        params: <any>params,
      },
    );
  }

  /**
   * query clusters by bbox
   */
  public clustersSpotsGet(params: SpotSpotsGetRequestDto): Observable<SpotSpotsGetResponseDto> {
    return this.httpClient.get<SpotSpotsGetResponseDto>(
      `${this.basePath}/${ClustersPaths.SPOTS}`,
      {
        params: <any>params,
      },
    );
  }
}
