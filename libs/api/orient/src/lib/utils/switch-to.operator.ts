import { Observable, Subscription } from 'rxjs';

/**
 * Works like regular switchMap from rxjs
 * But this one will also propagate complete event, not only error event
 */
export function switchTo<T>(factory: (session: any) => Observable<T>): ($in) => Observable<T> {
  return (in$: Observable<any>) => {
    return new Observable<T>(subscriber => {

      let innerSub: Subscription;
      const sub = in$.subscribe({
        next: (session) => {
          if(innerSub) {
            innerSub.unsubscribe();
          }
          innerSub = factory(session).subscribe({
            next: (data) => subscriber.next(data),
            error: (error) => subscriber.error(error),
            complete: () => subscriber.complete(),
          });
        },
        error: err => subscriber.error(err),
        complete: () => subscriber.complete()
      });

      return () => {
        if(innerSub) {
          innerSub.unsubscribe();
        }
        sub.unsubscribe();
      }
    });
  }
}
