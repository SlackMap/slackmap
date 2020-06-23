import { Component, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnInit } from '@angular/core';
import { MapService } from '../../map.service';
import { DrawType, DrawHandler, DrawData, DrawGeometry } from '../../+map';
import { ReplaySubject, combineLatest, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'map-draw-control',
  templateUrl: './draw-control.component.html',
  styleUrls: ['./draw-control.component.scss']
})
export class DrawControlComponent implements OnInit, OnDestroy {
  private handler: DrawHandler;
  public _type: DrawType;
  public distance: number;
  public vertexCount: number;
  public hasGeometry: boolean;

  private sub: Subscription;

  DrawType = DrawType;
  type$$ = new ReplaySubject<DrawType>(1);
  geometry$$ = new BehaviorSubject<DrawGeometry>(null);

  @Input()
  enableReset = false;

  @Input()
  set type(type: DrawType) {
    if(type) {
      this._type = type;
      this.type$$.next(type);
    }
  }
  @Input()
  set geometry(geometry: DrawGeometry) {
    if(geometry) this.geometry$$.next(geometry);
  }

  @Output()
  drawData = new EventEmitter<DrawData>();

  constructor(
    private mapService: MapService
  ) { }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = combineLatest([this.type$$.pipe(delay(2)), this.geometry$$]).pipe(
      switchMap(([type, geometry]) => this.mapService.drawHandler(type, geometry)),
    ).subscribe(handler => {
      this.drawData.next(handler.data);
      this.handler = handler;
      this.vertexCount = handler.data.vertexCount;
      this.distance = handler.data.distance;
      this.hasGeometry = !!handler.data.geometry;
    });
  }

  reset() {
    return this.handler && this.handler.reset();
  }
  undo() {
    return this.handler && this.handler.undo();
  }
  completeShape() {
    return this.handler && this.handler.completeShape();
  }

}
