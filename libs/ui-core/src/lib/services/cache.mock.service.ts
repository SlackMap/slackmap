import {Injectable} from '@angular/core';
import {Observable, empty} from 'rxjs';

/**
 * on the server side we have to mock the IonicStorage module
 */
@Injectable({
  providedIn: 'root'
})
export class CacheMockService {

  ready(): Observable<LocalForage> {
    return empty(null);
  }

  get<T>(name: string): Observable<T> {
    return empty(null);
  }

  set<T>(name: string, value: any): Observable<T> {
    return empty(null);
  }

  /**
   * load request and save it in cache
   */
  loadRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    return empty(null);
  }

  /**
   * tries to load from request, if fails, returns cache
   */
  loadRequestOrCache<T>(name: string, request$: Observable<T>): Observable<T> {
    return empty(null);
  }

  /**
   * returns cache, then request
   */
  loadCacheAndRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    return empty(null);
  }
}
