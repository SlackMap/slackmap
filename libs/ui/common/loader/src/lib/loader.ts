import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Loader {

  private counter = 0;

  constructor(
  ) {}
  loadingOverlay<T>(): (in$: Observable<T>) => Observable<T>  {
    return (in$: Observable<T>): Observable<T> => {
      return new Observable(observer => {
        this.showLoader();
        const sub = in$.subscribe({
          next: (v) => observer.next(v),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        })
        return () => {
          this.hideLoader()
          sub.unsubscribe();
        }
      })
    }
  }
  get isLoading(): boolean {
    return !!this.counter;
  }
  private showLoader() {
    this.counter++
  }

  private hideLoader() {
    this.counter--;
  }

}
