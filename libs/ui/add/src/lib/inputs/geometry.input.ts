import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { SUBTYPE_OPTIONS, ItemType, DrawType, ItemSubtypes, SportType } from "@slackmap/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DrawGeometry } from '@slackmap/ui/map';
@Component({
  selector: 'add-geometry-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeometryInput),
      multi: true
    }
  ]
})
export class GeometryInput  implements ControlValueAccessor {


  value: DrawGeometry;

  @Output()
  typeSelected = new EventEmitter()

  @Input()
  type: ItemType;

  @Input()
  drawType: DrawType;

  constructor() { }

  onClick(value) {
    this.value = value;
    this.propagateChange(this.value);
    this.typeSelected.emit(this.value);
  }

  propagateChange = (_: any) => {};
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  writeValue(value: DrawGeometry) {
    if (value !== undefined) {
      this.value = value;
    }
  }

}
