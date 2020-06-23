import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuService } from '@slackmap/ui/core';

@Component({
  selector: 'sm-map-top-menu',
  template: `<ng-container #container></ng-container>`,
  styles: []
})
export class MapTopMenuComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    public menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.menuService.mapTopMenuView = this.container;
  }

  get hasMenu() {
    return this.container && this.container.length;
  }

}
