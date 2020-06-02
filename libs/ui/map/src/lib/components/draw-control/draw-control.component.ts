import { Component, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { SubSink } from '@slackmap/core';
import { MapService } from '../../map.service';
import { DrawType, DrawHandler, DrawData, DrawGeometry } from '../../+map';
import { ReplaySubject, combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'map-draw-control',
  templateUrl: './draw-control.component.html',
  styleUrls: ['./draw-control.component.scss']
})
export class DrawControlComponent implements AfterViewInit, OnChanges {
  DrawType = DrawType;
  handler$: Observable<DrawHandler>;
  type$$ = new ReplaySubject<DrawType>(1);
  geometry$$ = new BehaviorSubject<DrawGeometry>(null);

  @Input()
  type: DrawType;

  @Input()
  geometry: DrawGeometry;

  @Output()
  drawData = new EventEmitter<DrawData>();

  constructor(
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {
    this.handler$ = combineLatest([this.type$$, this.geometry$$]).pipe(
      switchMap(([type, geometry]) => this.mapService.drawHandler(type, geometry)),
      tap({
        next: handler => this.drawData.next(handler.data)
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.type && changes.type.currentValue) {
      this.type$$.next(changes.type.currentValue);
    }
    if(changes.geometry && changes.geometry.currentValue) {
      this.geometry$$.next(changes.geometry.currentValue);
    }
  }
}
