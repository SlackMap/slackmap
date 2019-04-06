import {Injectable} from '@angular/core';
import {Observable, from, merge} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: Storage) {
  // storage.ready().then(() => {
  //   console.log('storage ready');
  // });
  }

  ready(): Observable<LocalForage> {
    return from(this.storage.ready());
  }

  get<T>(name: string): Observable<T> {
    return from(this.storage.get(name));
  }

  set<T>(name: string, value: any): Observable<T> {
    return from(Observable.create());
  }

  /**
   * load request and save it in cache
   */
  loadRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    return request$.pipe(
      tap((data) => {
        this.storage.set(name, data);
      }),
      catchError(err => from(this.storage.get(name)))
    );
  }

  /**
   * tries to load from request, if fails, returns cache
   */
  loadRequestOrCache<T>(name: string, request$: Observable<T>): Observable<T> {
    return request$.pipe(
      tap((data) => {
        this.storage.set(name, data);
      }),
      catchError(err => from(this.storage.get(name)))
    );
  }

  /**
   * returns cache, then request
   */
  loadCacheAndRequest<T>(name: string, request$: Observable<T>): Observable<T> {
    const cache$: Observable<any> = Observable.create((observable) => {
      this.storage.get(name).then((data) => {
        if (data) {
          observable.next(data);
        }
        observable.complete();
      });
    });
    return merge(
      cache$,
      request$.pipe(
        tap((data) => {
          this.storage.set(name, data);
        })
      )
    );
  }
}
