import { Observable } from 'rxjs';
import { ODatabaseSession, LiveQuery } from 'orientjs';
import { OrientConnection } from '../orient.interfaces';

export function liveQueryMap<T>(streamFn: (session: ODatabaseSession) => LiveQuery): ($in) => Observable<T> {
  return (in$: Observable<OrientConnection>) => {
    return new Observable<T>(subscriber => {
      // if acquire session promise will resolve after subscriber unsubscribes
      // we will have hanging unused session
      // so we have to keep this info in this variable
      let closed = false;
      let stream: LiveQuery;
      const sub = in$.subscribe({
        next: ({ pool }) => {
          pool.acquire()
            .then((session) => {
              stream = streamFn(session);

              stream.on("data", (data: any) => {
                subscriber.next(data);
              })
                .on('error', (err) => {
                  subscriber.error(err)
                })
                .on("end", () => {
                  subscriber.complete();
                });
              session.close().catch(err => console.error(err.message, err.stack));
            })
            .catch(err => subscriber.error(err))
        },
        error: err => subscriber.error(err),
        complete: () => subscriber.complete()
      });

      return () => {
        if (stream) {
          stream.unsubscribe();
        }
        closed = true;
        sub.unsubscribe();
      }
    });
  }
}
