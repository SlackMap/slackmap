import { Observable } from 'rxjs';
import { OResult, ODatabaseSession, LiveQuery } from 'orientjs';
import { OrientConnection } from '../orient.interfaces';
import { Logger } from '@nestjs/common';
const logger = new Logger('LiveQuery');
export function liveQueryMap<T>(streamFn: (session: ODatabaseSession) => LiveQuery): ($in) => Observable<T> {
  return (in$: Observable<OrientConnection>) => {
    return new Observable<T>(subscriber => {
      logger.log('new subscription')
      let stream: LiveQuery;
      const sub = in$.subscribe({
        next: ({ pool }) => {
          logger.log('got the pool')
          pool.acquire()
            .then((session) => {
              logger.log('got the session')
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
        logger.log('clean')
        if (stream) {
          stream.unsubscribe();
        }
        sub.unsubscribe();
      }
    });
  }
}
