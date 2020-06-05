import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';
import { AuthFacade } from '@slackmap/ui/auth';
import { Measure } from '@slackmap/core';

@Component({
  selector: 'add-distance-input',
  templateUrl: './distance.input.html',
  styleUrls: ['./distance.input.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: DistanceInput }],
  host: {
    '[class.is-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class DistanceInput implements ControlValueAccessor, MatFormFieldControl<number>, OnDestroy {

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;

  static nextId = 0;

  private _imperial = false;
  inputValue: FormControl;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'add-distance-input';
  id = `add-distance-input-${DistanceInput.nextId++}`;
  describedBy = '';
  settingsSub: Subscription;
  onChange = (_: any) => { };
  onTouched = () => { };


  get imperial() {
    return this._imperial;
  }
  set imperial(v) {
    let distance = this.value;
    this._imperial = v;
    if (this.imperial) {
      distance = Measure.convert(distance, Measure.METRIC_TO_IMPERIAL);
    }
    this.inputValue.setValue(distance);
  }
  get empty() {
    return !this.inputValue.value || this.inputValue.value === 0;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.inputValue.disable() : this.inputValue.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): number | null {
    if (this.inputValue.valid) {
      if (this.imperial && this.inputValue.value) {
        return Measure.convert(this.inputValue.value, Measure.IMPERIAL_TO_METRIC);
      }
      return this.inputValue.value || null;
    }
    return null;
  }
  set value(distance: number | null) {
    distance = parseInt(distance as any, 10) || null;
    if (this.imperial && distance) {
      distance = Measure.convert(distance, Measure.METRIC_TO_IMPERIAL);
    }
    this.inputValue.setValue(distance);
    this.stateChanges.next();
  }

  constructor(
    private authFacade: AuthFacade,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
  ) {

    this.inputValue = new FormControl(null);

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.settingsSub = this.authFacade.settings$.subscribe(settings => this.imperial = !!(settings?.imperial))
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this.settingsSub.unsubscribe();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(distance: number | null): void {
    this.value = distance;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

}
