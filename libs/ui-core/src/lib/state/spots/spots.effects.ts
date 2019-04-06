import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { SpotsActionTypes, SpotsActions } from './spots.actions';


@Injectable()
export class SpotsEffects {


  // @Effect()
  // loadSpotss$ = this.actions$.pipe(
  //   ofType(SpotsActionTypes.LoadSpotss),
  //   concatMap(() => EMPTY)
  // );


  constructor(private actions$: Actions<SpotsActions>) {}

}
