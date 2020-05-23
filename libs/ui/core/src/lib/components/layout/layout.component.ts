import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, PLATFORM_ID, Inject, ApplicationRef, Injector } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { CoreFacade } from '../../+core/core.facade';
import { AuthService } from '../../auth';

@Component({
  selector: 'sm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  showMap = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @ViewChild('mapContainer', { read: ViewContainerRef })
  private mapContainer: ViewContainerRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    @Inject(PLATFORM_ID) private platformId: Object,
    private app: ApplicationRef,
    private injector: Injector,
    private coreFacade: CoreFacade,
    private authService: AuthService
  ) { }

  onLogin() {
    this.authService.login().subscribe(
      user => console.log('login success', user),
      err => console.log('login error', err),
    );
  }
  ngAfterViewInit(): void {
    this.onLogin()
    // get version from root element (AppComponent)
    const version = this.injector.get(this.app.componentTypes[0]).version;
    this.coreFacade.dispatch(this.coreFacade.actions.version({version}))

    // this code will work only in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    import('../../../../../map/src/lib/leaflet/leaflet-map.component').then(
      ({ LeafletMapComponent }) => {
        const component = this.componentFactoryResolver.resolveComponentFactory(LeafletMapComponent);
        const componentRef = this.mapContainer.createComponent(component);
      }
    );
  }
}
