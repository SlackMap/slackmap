import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromCore from './core.reducer';
import * as CoreActions from './core.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable()
export class CoreEffects {

  isHandset$ = createEffect(() =>
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => CoreActions.isHandset({isHandset: result.matches})),
    )
  );

  constructor(
    private actions$: Actions,
    private breakpointObserver: BreakpointObserver,
  ) {}
}
