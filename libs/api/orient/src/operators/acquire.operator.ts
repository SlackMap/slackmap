import { Observable } from 'rxjs';
import { ODatabaseSession } from 'orientjs';
import { OrientConnection } from '../orient.interfaces';

export function acquire(): ($in) => Observable<ODatabaseSession> {
  return (in$: Observable<OrientConnection>) => {
    return new Observable<ODatabaseSession>(subscriber => {
      // if acquire session promise will resolve after subscriber unsubscribes
      // we will have hanging unused session
      // so we have to keep this info in this variable
      let closed = false;
      let sessionCache: ODatabaseSession;
      const sub = in$.subscribe({
        next: ({pool}) => {
          pool.acquire().then(session => {
            if(closed) {
              session.close().catch(err => console.error(err.message, err.stack)); // session comes after subscriber unsubscribes, so we close the session
            } else {
              sessionCache = session;
              subscriber.next(session);
              sub.unsubscribe();
            }
          })
        },
        error: err => subscriber.error(err),
        // complete: () => subscriber.complete()  // do whe have to proxy this or not ?, for now not, the in$ will never complete, wil next or error only
      });

      return () => {
        if(sessionCache) {
          sessionCache.close().catch(err => console.error(err.message, err.stack));
        }
        closed = true;
        sub.unsubscribe();
      }
    });
  }
}
