import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SpotsPaths, SpotClustersGetRequestDto, SpotClustersGetResponseDto, SpotSpotsGetRequestDto, SpotSpotsGetResponseDto } from '@slackmap/core';

export const API_HOST = new InjectionToken('api-host');

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    protected httpClient: HttpClient,
    @Inject(API_HOST) protected basePath,
  ) {}

  /**
   * query clusters by bbox
   */
  public clustersGet(params: SpotClustersGetRequestDto): Observable<SpotClustersGetResponseDto> {
    return this.httpClient.get<SpotClustersGetResponseDto>(
      `${this.basePath}/${SpotsPaths.CLUSTERS}`,
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
      `${this.basePath}/${SpotsPaths.SPOTS}`,
      {
        params: <any>params,
      },
    );
  }
}
