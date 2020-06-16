import { Injectable } from '@angular/core';
import { Observable, from, merge, EMPTY, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: StorageService) {}

  get<T>(key: string): Observable<T> {
    return this.storage.get<T>(key);
  }

  set<T>(key: string, value: any): Observable<T> {
    return this.storage.set<T>(key, value);
  }

  /**
   * load request and save it in cache
   */
  loadRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    return request$.pipe(
      tap((data) => {
        this.set(name, data).subscribe({error: err => console.error(err)});
      }),
      catchError(err => from(this.get<T>(name)))
    );
  }

  /**
   * tries to load from request, if fails, returns cache
   */
  loadRequestOrCache<T>(name: string, request$: Observable<T>): Observable<T> {
    return request$.pipe(
      tap((data) => {
        this.set(name, data).subscribe({error: err => console.error(err)});
      }),
      catchError(err => from(this.get<T>(name)))
    );
  }

  /**
   * returns cache, then request
   */
  loadCacheAndRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    const cache$ = this.get<T>(name).pipe(
      switchMap(data => data ? of(data) : EMPTY),
      catchError(err => EMPTY)
    );

    return merge(
      cache$,
      request$.pipe(
        tap((data) => {
          this.set(name, data).subscribe({error: err => console.error(err)});
        })
      )
    );
  }
}
