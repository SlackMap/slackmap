import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { SUBTYPE_OPTIONS, ItemType, DrawType, ItemSubtypes, SportType } from "@slackmap/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'add-subtype-input',
  templateUrl: './subtype.input.html',
  styleUrls: ['./subtype.input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubtypeInput),
      multi: true
    }
  ]
})
export class SubtypeInput  implements ControlValueAccessor {

  DrawType = DrawType;
  ItemType = ItemType;

  value: ItemSubtypes;

  slackAreaOptions = SUBTYPE_OPTIONS.filter(o => (o.type === ItemType.SPOT && o.drawType === DrawType.AREA && o.sport === SportType.SLACKLINE && o.order)).sort((a,b) => a.order - b.order);
  slackLineOptions = SUBTYPE_OPTIONS.filter(o => (o.type === ItemType.SPOT && o.drawType === DrawType.LINE && o.sport === SportType.SLACKLINE && o.order)).sort((a,b) => a.order - b.order);

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
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  writeValue(value: ItemSubtypes) {
    if (value !== undefined) {
      this.value = value;
    }
  }

}
