import {Observable} from 'rxjs';

export interface ArrayDiff<T> {
  enter: T[];
  update: T[];
  exit: T[];
}
/**
 * custom rxjs operator
 * as input exptexts array of values
 * as output returns ArayDiff interface witch has diff info betwen current and prevous value emited by the source observable
 *  - enter property holds new values witch were not present in prevous value
 *  - update proprety holds values witch were present before
 *  - exit property holds values witch are missing in new value and were present in prvous value
 */
export function arrayDiff<T>() {
  return function (source): Observable<ArrayDiff<T>> {
    let lastValues = [];
    return Observable.create(subscriber => {
      const sub = source.subscribe(values => {
        const diff = {
          enter: [],
          update: [],
          exit: []
        };
        for (let index = 0; index < values.length; index++) {
          const value = values[index];
          if (lastValues.indexOf(value) < 0) {
            // this values are new and are entering the set
            diff.enter.push(value);
          } else {
            // this values are already existing
            diff.update.push(value);
          }
        }
        for (let index = 0; index < lastValues.length; index++) {
          const value = lastValues[index];
          if (values.indexOf(value) < 0) {
            // this values are missing and are exiting the set
            diff.exit.push(value);
          }
        }
        lastValues = values;
        try {
          subscriber.next(diff);
        } catch (err) {
          subscriber.error(err);
        }
      },
        err => subscriber.error(err),
        () => subscriber.complete()
      );
      return () => {
        sub.unsubscribe();
        lastValues = [];
      };
    });
  };
}
