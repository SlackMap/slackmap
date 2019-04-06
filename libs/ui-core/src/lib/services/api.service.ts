import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ClustersGetRequestDto, ClustersGetResponseDto, ClustersSpotsGetRequestDto, ClustersSpotsGetResponseDto } from '@slackmap/core/api';

const API_HOST = new InjectionToken('api-host');

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    protected httpClient: HttpClient,
    @Inject(API_HOST) protected basePath = 'https://api.slackmap.com',
  ) {}

  /**
   * query clusters by bbox
   */
  public clustersGet(params: ClustersGetRequestDto): Observable<ClustersGetResponseDto> {
    return this.httpClient.get<ClustersGetResponseDto>(
      `${this.basePath}/clusters`,
      {
        params: <any>params,
      },
    );
  }

  /**
   * query clusters by bbox
   */
  public clustersSpotsGet(params: ClustersSpotsGetRequestDto): Observable<ClustersSpotsGetResponseDto> {
    return this.httpClient.get<ClustersSpotsGetResponseDto>(
      `${this.basePath}/clusters/spots`,
      {
        params: <any>params,
      },
    );
  }
}
