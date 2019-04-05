import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadMapsFailure, LoadMapsSuccess, MapActionTypes, MapActions } from './map.actions';



@Injectable()
export class MapEffects {

  @Effect()
  loadMaps$ = this.actions$.pipe(
    ofType(MapActionTypes.LoadMaps),
    concatMap(() =>
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      EMPTY.pipe(
        map(data => new LoadMapsSuccess({ data })),
        catchError(error => of(new LoadMapsFailure({ error }))))
    )
  );


  constructor(private actions$: Actions<MapActions>) {}

}
