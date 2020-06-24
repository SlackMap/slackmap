import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { untilDestroy } from '@ngrx-utils/store';
import { getTitleHtmlFromItem } from '@slackmap/core';
import { AuthFacade } from '../+auth';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'itemTitle',
  pure: false
})
export class ItemTitlePipe implements PipeTransform, OnDestroy {

  private imperial = false;

  constructor(
    private authFacade: AuthFacade,
    private sanitize: DomSanitizer,
  ) {
    this.authFacade.settings$
    .pipe(untilDestroy(this))
    .subscribe(settings => this.imperial = settings.imperial);
  }

  transform(item: any, ...args: unknown[]): unknown {
    return this.sanitize.bypassSecurityTrustHtml(getTitleHtmlFromItem(item, this.imperial));
  }
//
  ngOnDestroy() {}
}
