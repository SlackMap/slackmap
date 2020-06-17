import { Directive, TemplateRef, ViewRef, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services';

@Directive({
  selector: '[smMenu]'
})
export class MenuDirective implements OnInit, OnDestroy {
  private _viewRef: ViewRef;

  constructor(
    private menuService: MenuService,
    public tpl: TemplateRef<any>
  ) { }

  ngOnInit() {
    console.log('INIT', this.tpl)
    this._viewRef = this.menuService.vcr.createEmbeddedView(this.tpl);
  }

  ngOnDestroy() {
    this._viewRef.destroy();
  }
}
