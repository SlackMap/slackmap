import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MapComponent, MapViewChangeData, DrawType, DrawHandler, DrawGeometry, ViewOptions, FitFeaturesOptions } from './+map';
import { switchMap, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService implements MapComponent {


  public view: ViewOptions;
  public fit: FitFeaturesOptions;

  private map: MapComponent;
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

  drawHandler(type: DrawType): Observable<DrawHandler> {
    return this.map$.pipe(
      switchMap(map => map.drawHandler(type))
    );
  }

  editHandler(geometry: DrawGeometry, type?: DrawType): Observable<DrawHandler> {
    return this.map$.pipe(
      switchMap(map => map.editHandler(geometry, type))
    );
  }

  setMap(map: MapComponent) {
    this.map = map;
    this.map$$.next(map);
  }

  setView(options: ViewOptions) {
    this.view = options;
    if(this.map) {
      this.map.setView(options);
    }
  }

  fitFeatures(options: FitFeaturesOptions) {
    this.fit = options;
    if(this.map) {
      this.map.fitFeatures(options);
    }
  }
}
