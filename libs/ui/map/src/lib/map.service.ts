import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MapComponent, MapViewChangeData, DrawType, DrawShape, DrawHandler } from './ui-map.models';
import { switchMap, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService implements MapComponent {

  private map$$ = new ReplaySubject<MapComponent>(1);
  map$ = this.map$$.asObservable();

  viewChange$: Observable<MapViewChangeData> = this.map$.pipe(
    switchMap(map => map.viewChange$)
  );

  itemClick$: Observable<{ item: any; }> = this.map$.pipe(
    switchMap(map => map.itemClick$)
  );


  spotsLayer(spots$: Observable<any>): Observable<void> {
    return this.map$.pipe(
      switchMap(map => map.spotsLayer(spots$))
    );
  }

  drawHandler(type: DrawType, shape?: DrawShape): Observable<DrawHandler> {
    return this.map$.pipe(
      switchMap(map => map.drawHandler(type, shape))
    );
  }

  setMap(map: MapComponent) {
    this.map$$.next(map);
  }
}
