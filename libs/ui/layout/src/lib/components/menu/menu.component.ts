import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthFacade } from '@slackmap/ui/auth';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { CoreFacade, MenuService } from '@slackmap/ui/core';

@Component({
  selector: 'sm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  drawer: MatSidenav;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    public authFacade: AuthFacade,
    public coreFacade: CoreFacade,
    public menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.menuService.vcr = this.container;
  }

  get hasMenu() {
    return this.container && this.container.length;
  }
}
