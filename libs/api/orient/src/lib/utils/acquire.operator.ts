import { Observable } from 'rxjs';
import { ODatabaseSession } from 'orientjs';

/**
 * This is create operator for converting Promise<ODatabaseSession> to Observable<ODatabaseSession>
 * This observable will close the session when the subscriber unsubscribes
 */
export function acquire(sessionPromise: Promise<ODatabaseSession>):  Observable<ODatabaseSession> {
    return new Observable<ODatabaseSession>(subscriber => {
      // if session promise will resolve after subscriber unsubscribes
      // we will have hanging unused session
      // so we have to keep this info in this variable
      let closed = false;
      let sessionCache: ODatabaseSession;
      sessionPromise.then(session => {
        if(closed) {
          // session comes after subscriber unsubscribes, so we close the session
          session.close().catch(err => console.error(err.message, err.stack));
        } else {
          sessionCache = session;
          subscriber.next(session);
        }
      })
      .catch(err => subscriber.error(err))

      return () => {
        if(sessionCache) {
          sessionCache.close().catch(err => console.error(err.message, err.stack));
        }
        closed = true;
      }
    });
}
