import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
  ) { }

  ngAfterViewInit(): void {
    import('../../../../../map/src/lib/leaflet/leaflet-map.component').then(
      ({ LeafletMapComponent }) => {
        const component = this.componentFactoryResolver.resolveComponentFactory(LeafletMapComponent);
        const componentRef = this.mapContainer.createComponent(component);
      }
    );
  }
}
