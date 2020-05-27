import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UiConfig } from "@slackmap/ui/config";
import { CONFIG_PATHS, CLUSTERS_PATHS, ClustersClustersGetRequestDto, ClustersClustersGetDto, ClustersSpotsGetRequestDto, ClustersSpotsGetDto, ConfigGetDto, AUTH_PATHS, AuthSignInByFacebookRequestDto, AuthSignInByFacebookDto, AuthMeGetDto, AuthSignUpByFacebookRequestDto, AuthSignUpByFacebookDto } from '@slackmap/api-client';

const API_TOKEN_STORAGE_KEY = 'apiToken';

@Injectable({ providedIn: 'root' })
export class UiApiService {

  private token: string;
  constructor(
    private httpClient: HttpClient,
    private config: UiConfig,
  ) {}

  get basePath() {
    return this.config.API_HOST;
  }
  public getToken() {
    return localStorage.getItem(API_TOKEN_STORAGE_KEY);
  }
  public setToken(token: string | null) {
    if(token) {
      localStorage.setItem(API_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(API_TOKEN_STORAGE_KEY);
    }
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
   * Sign In By FB
   */
  public authSignInByFacebook(data: AuthSignInByFacebookRequestDto): Observable<AuthSignInByFacebookDto> {
    return this.httpClient.post<AuthSignInByFacebookDto>(`${this.basePath}/${AUTH_PATHS.signInByFacebook()}`, data);
  }

  /**
   * Sign In By FB
   */
  public authSignUpByFacebook(data: AuthSignUpByFacebookRequestDto): Observable<AuthSignUpByFacebookDto> {
    return this.httpClient.post<AuthSignUpByFacebookDto>(`${this.basePath}/${AUTH_PATHS.signUpByFacebook()}`, data);
  }

  /**
   * Get me
   */
  public authMe(): Observable<AuthMeGetDto> {
    return this.httpClient.get<AuthMeGetDto>(`${this.basePath}/${AUTH_PATHS.me()}`);
  }
}
