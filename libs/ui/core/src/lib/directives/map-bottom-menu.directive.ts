import { Directive, TemplateRef, ViewRef, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services';

@Directive({
  selector: '[smMapBottomMenu]'
})
export class MapBottomMenuDirective implements OnInit, OnDestroy {
  private _viewRef: ViewRef;

  constructor(
    private menuService: MenuService,
    public tpl: TemplateRef<any>
  ) { }

  ngOnInit() {
    this._viewRef = this.menuService.mapBottomMenuView.createEmbeddedView(this.tpl);
  }

  ngOnDestroy() {
    this._viewRef.destroy();
  }
}
