import { Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from './ui-api-tokens';
import { Observable } from 'rxjs';
import { CONFIG_PATHS, CLUSTERS_PATHS, ClustersClustersGetRequestDto, ClustersClustersGetDto, ClustersSpotsGetRequestDto, ClustersSpotsGetDto, ConfigGetDto, AUTH_PATHS, AuthConnectFacebookRequestDto, AuthConnectFacebookDto, AuthMeGetDto } from '@slackmap/api-client';

@Injectable({ providedIn: 'root' })
export class UiApiService {

  private token: string;

  constructor(
    protected httpClient: HttpClient,
    @Inject(API_HOST) protected basePath,
  ) {}

  public getToken() {
    return this.token;
  }
  public setToken(token: string) {
    return this.token = token;
  }
  public getConfig(): Observable<ConfigGetDto> {
    return this.httpClient.get<ConfigGetDto>(
      `${this.basePath}/${CONFIG_PATHS.configGet()}`
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
  public clustersSpotsGet(params: ClustersSpotsGetRequestDto): Observable<ClustersSpotsGetDto> {
    return this.httpClient.get<ClustersSpotsGetDto>(
      `${this.basePath}/${CLUSTERS_PATHS.spotsGet()}`,
      {
        params: <any>params,
      },
    );
  }

  /**
   * query clusters by bbox
   */
  public authConnectFacebook(data: AuthConnectFacebookRequestDto): Observable<AuthConnectFacebookDto> {
    return this.httpClient.post<AuthConnectFacebookDto>(`${this.basePath}/${AUTH_PATHS.connectFacebook()}`, data);
  }

  /**
   * Get me
   */
  public authMe(): Observable<AuthMeGetDto> {
    return this.httpClient.get<AuthMeGetDto>(`${this.basePath}/${AUTH_PATHS.me()}`);
  }
}
