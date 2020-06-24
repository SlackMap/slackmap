import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { untilDestroy } from '@ngrx-utils/store';
import { CoreFacade } from '../+core';

@Pipe({
  name: 'isHandset',
  pure: false
})
export class IsHandsetPipe implements PipeTransform, OnDestroy {

  private isHandset = false;

  constructor(
    private coreFacade: CoreFacade,
  ) {
    this.coreFacade.isHandset$
    .pipe(untilDestroy(this))
    .subscribe(isHandset => this.isHandset = isHandset);
  }

  transform(value: any, ...args: unknown[]): unknown {
    return this.isHandset;
  }
  ngOnDestroy() {}
}
