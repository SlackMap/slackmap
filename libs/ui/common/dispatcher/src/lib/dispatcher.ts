import { Injectable } from '@angular/core';
import { Store, Action, ActionCreator } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class Dispatcher {

  constructor(
    private actions$: Actions,
    private store: Store<any>
  ) {}

  run(action: Action, untilActions: ActionCreator[]): Observable<void> {
    return new Observable<void>(subscriber => {
      this.store.dispatch(action);
    }).pipe(
      takeUntil(this.actions$.pipe(ofType(...untilActions)))
    )
  }

}
