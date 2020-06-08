import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { untilDestroy } from '@ngrx-utils/store';
import { Measure } from '@slackmap/core';
import { AuthFacade } from '../+auth';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'distance',
  pure: false
})
export class DistancePipe implements PipeTransform, OnDestroy {

  private imperial = false;

  constructor(
    private authFacade: AuthFacade,
    private sanitize: DomSanitizer,
  ) {
    this.authFacade.settings$
    .pipe(untilDestroy(this))
    .subscribe(settings => this.imperial = settings.imperial);
  }

  transform(distance: any, ...args: unknown[]): unknown {

    if (!distance) {
      distance = 0;
    };
    if(typeof distance !== 'number') {
      distance = parseInt(distance, 10) || 0;
    }
    if (this.imperial) {
      return this.sanitize.bypassSecurityTrustHtml(Math.round(Measure.convert(distance, Measure.METRIC_TO_IMPERIAL)) + '<i>ft</i>');
    } else {
      return this.sanitize.bypassSecurityTrustHtml(Math.round(distance) + '<i>m</i>');
    }
  }
  ngOnDestroy() {}
}
