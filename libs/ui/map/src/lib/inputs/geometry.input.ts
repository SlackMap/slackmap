import { Component, OnInit, Input, forwardRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DrawType } from "@slackmap/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DrawGeometry } from '@slackmap/ui/map';
import { MapService } from '../map.service';
import { BehaviorSubject, Subscription, combineLatest, EMPTY } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { DrawData } from '../+map';

@Component({
  selector: 'map-geometry-input',
  template: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeometryInput),
      multi: true
    }
  ]
})
export class GeometryInput  implements ControlValueAccessor, OnInit, OnDestroy {

  private sub: Subscription;
  private geometry$$ = new BehaviorSubject<DrawGeometry>(null);
  private drawType$$ = new BehaviorSubject<DrawType>(null);

  @Input()
  set drawType(type: DrawType) {
    this.drawType$$.next(type)
  }

  @Output()
  drawData = new EventEmitter<DrawData>()

  constructor(
    private mapService: MapService
  ) { }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  writeValue(geometry: DrawGeometry) {
    this.geometry$$.next(geometry);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = combineLatest([this.drawType$$.pipe(delay(2)), this.geometry$$]).pipe(
      switchMap(([type, geometry]) => (geometry && type) ? this.mapService.editHandler(geometry, type).pipe(switchMap(handler => handler.data$)) : EMPTY),
    ).subscribe(data => {
      this.propagateChange(data.geometry);
      this.drawData.emit(data);
    });
  }
}
