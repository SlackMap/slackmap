import { Observable } from 'rxjs';
import { OResult, ODatabaseSession } from 'orientjs';

export function streamMap<T>(streamFn: (session: ODatabaseSession) => OResult<T>): ($in) => Observable<T> {
  return (in$: Observable<any>) => {
    return new Observable<T>(subscriber => {

      let stream: OResult<T>;
      const sub = in$.subscribe({
        next: (session) => {
          stream = streamFn(session);

          stream.on("data", (data: any) => {
              subscriber.next(data);
          })
          .on('error',(err)=> {
            subscriber.error(err)
          })
          .on("end", () => {
            subscriber.complete();
          });
        },
        error: err => subscriber.error(err),
        complete: () => subscriber.complete()
      });

      return () => {
        if(stream) {
          stream.close();
        }
        sub.unsubscribe();
      }
    });
  }
}
