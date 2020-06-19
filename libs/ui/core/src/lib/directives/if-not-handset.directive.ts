import { Directive, TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreFacade } from '../+core';

@Directive({
  selector: '[smIfNotHandset]'
})
export class IfNotHandsetDirective implements OnInit, OnDestroy {

  private hasView = false;
  private sub: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private coreFacade: CoreFacade,
  ) { }

  ngOnInit() {

    this.sub = this.coreFacade.isHandset$
      .subscribe((isHandset) => {
        if (!isHandset && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (isHandset && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
