import { Directive, TemplateRef, ViewRef, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services';

@Directive({
  selector: '[smMapTopMenu]'
})
export class MapTopMenuDirective implements OnInit, OnDestroy {
  private _viewRef: ViewRef;

  constructor(
    private menuService: MenuService,
    public tpl: TemplateRef<any>
  ) { }

  ngOnInit() {
    this._viewRef = this.menuService.mapTopMenuView.createEmbeddedView(this.tpl);
  }

  ngOnDestroy() {
    this._viewRef.destroy();
  }
}
