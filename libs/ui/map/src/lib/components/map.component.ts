import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Inject, PLATFORM_ID, ApplicationRef, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'map-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { read: ViewContainerRef })
  private mapContainer: ViewContainerRef;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }


  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this code will work only in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    import('../leaflet/leaflet-map.component').then(
      ({ LeafletMapComponent }) => {
        const component = this.componentFactoryResolver.resolveComponentFactory(LeafletMapComponent);
        const componentRef = this.mapContainer.createComponent(component);
      }
    );
  }
}
