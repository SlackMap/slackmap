import { Directive, TemplateRef, ViewContainerRef, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreFacade } from '../+core';

@Directive({
  selector: '[smHandsetClass]',
})
export class HandsetClassDirective implements OnInit, OnDestroy {

  @HostBinding('class.is-handset')
  private isHandset = false;
  private sub: Subscription;

  constructor(
    private coreFacade: CoreFacade,
  ) { }

  ngOnInit() {
    this.sub = this.coreFacade.isHandset$.subscribe((isHandset) => this.isHandset = isHandset);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
