import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID, NgZone, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as L from "leaflet";
import { restoreView } from './plugins/leaflet.restoreview';
import { leafletCustoms } from './map/leaflet-customs';
import { drawHandler } from './draw/draw-handler';
import { mapTileLayer } from './layers/map.tile.layer';
import { satelliteGoogleTileLayer } from './layers/satellite.google.tile.layer';
import { SpotsLayer } from './layers/spots.layer';
import { ItemUtils, MAP_ZOOM_THRESHOLD } from '@slackmap/core';
import { MapService } from '../map.service';
import { merge, fromEvent, Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil, startWith, debounceTime, share } from 'rxjs/operators';
import * as geohash from 'ngeohash';
import { MapViewChangeData, MapComponent, DrawType, DrawHandler, DrawGeometry, FitFeaturesOptions, ViewOptions } from '../+map';
import { editHandler } from './draw/edit-handler';
import { bbox } from '@turf/turf';

restoreView();
leafletCustoms();

@Component({
  selector: 'map-leaflet-map',
  template: `
    <div #mapContainer class="map-container">
      <!-- <span class="map-loader" *ngIf="!map">Loading map...</span> -->
    </div>
  `,
  styleUrls: ['./leaflet-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements AfterViewInit, OnDestroy, MapComponent {

  destroy$ = new Subject();
  viewChange$: Observable<MapViewChangeData>;
  itemClick$: Observable<{item: any}>;

  private spotsLayer$ = new Observable<SpotsLayer>(subscriber => {
    const layer = new SpotsLayer(this.itemUtils);
    layer.addTo(this.map);
    subscriber.next(layer)
    return () => {
      this.map.removeLayer(layer);
    }
  })

  public map: L.Map;
  @ViewChild('mapContainer', { read: ElementRef, static: true }) mapContainer: ElementRef;

  constructor(

    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private itemUtils: ItemUtils,
    private mapService: MapService,
  ) { }

  ngAfterViewInit(): void {
    // this.zone.runOutsideAngular(async () => {

      const _map = L.map(this.mapContainer.nativeElement);

      this.map = _map;

      const mapTileLayerInstance = mapTileLayer().addTo(_map);
      const satelliteTileLayerInstance = satelliteGoogleTileLayer();

      const baseLayers = {
        'Map': mapTileLayerInstance,
        'Satellite': satelliteTileLayerInstance
      };
      // const slacklineSpotsLayer = new SpotsLayer(this.itemUtils);
      const overlays = {
        // 'Slackline': slacklineSpotsLayer
      };
      L.control.layers(baseLayers, overlays).addTo(_map);
      // slacklineSpotsLayer.setSpots(clusters.clusters)
      // // minimap
      // const miniMap = new L.Control.GlobeMiniMap().addTo(_map);

      this.setupObservables();

      this.cd.detectChanges();
      this.mapService.setMap(this);
      if(this.mapService.view) {
        const options = this.mapService.view;
        _map.setView([options.position[1], options.position[0]], options.zoom);
      } else if (!_map.restoreView()) {
        // _map.setView([27.916159899896595, -15.604705810546875], 10);
        _map.setView([0, 0], 1);
      }
    // });

  }

  /**
  * export some events
  */
  setupObservables() {

    /**
     * dispatch map moves
     */
    this.viewChange$ = merge(
      fromEvent(this.map, 'moveend'),
      fromEvent(this.map, 'zoomend')
    ).pipe(
      startWith(1),
      debounceTime(250),
      map(() => {
        const zoom = this.map.getZoom();
        const bb = this.map.getBounds().limit().toGeoJSON();
        const hashes = (zoom < MAP_ZOOM_THRESHOLD) ? ['clusters'] : geohash.bboxes(bb[1], bb[0], bb[3], bb[2], 6).sort();
        const data: MapViewChangeData = {
          bounds: this.map.getBounds().limit().toArray(),
          bbox: bb,
          zoom,
          hashes
        };
        return data;
      }),
      share(),
      takeUntil(this.destroy$),
    );

    /**
     * dispatch item clicks
     */
    this.itemClick$ = fromEvent(this.map, 'item-click')
      .pipe(
        map((e: any) => ({ item: e.item })),
        share(),
        takeUntil(this.destroy$),
      )
  }

  spotsLayer(spots$: Observable<any>): Observable<void> {
    return combineLatest([spots$, this.spotsLayer$]).pipe(
      map(([spots, layer]) => {
        layer.setSpots(spots)
      })
    );
  }

  drawHandler(type: DrawType): Observable<DrawHandler> {
    return drawHandler(this.map, type)
  }

  editHandler(geometry: DrawGeometry, type?: DrawType): Observable<DrawHandler> {
    return editHandler(this.map, geometry, type)
  }

  fitFeatures(options: FitFeaturesOptions): void {
    if(this.map) {
      const bb = bbox(options.features);
      this.map.fitBbox(bb, {})
    }
  }

  setView(options: ViewOptions): void {
    if(this.map) {
      this.map.setView([options.position[1], options.position[0]], options.zoom)
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
