import {Injectable} from '@angular/core';
import {Observable, EMPTY} from 'rxjs';
import { CacheService } from './cache.service';

/**
 * on the server side we have to mock the IonicStorage module
 */
@Injectable({
  providedIn: 'root'
})
export class CacheMockService extends CacheService {

  ready(): Observable<LocalForage> {
    return EMPTY;
  }

  get<T>(name: string): Observable<T> {
    return EMPTY;
  }

  set<T>(name: string, value: any): Observable<T> {
    return EMPTY;
  }

  /**
   * load request and save it in cache
   */
  loadRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    return EMPTY;
  }

  /**
   * tries to load from request, if fails, returns cache
   */
  loadRequestOrCache<T>(name: string, request$: Observable<T>): Observable<T> {
    return EMPTY;
  }

  /**
   * returns cache, then request
   */
  loadCacheAndRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    return EMPTY;
  }
}
