import {Component, OnInit, ElementRef, ViewChild, NgZone, OnDestroy, Output, EventEmitter} from '@angular/core';
import {PLATFORM_ID, APP_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LazyLoad} from '@slackmap/ui-core';
import {merge, fromEvent, ReplaySubject, Observable, Subject} from 'rxjs';
import {debounceTime, startWith, map, takeUntil} from 'rxjs/operators';
import {ItemUtils, SUBTYPES, ItemType} from '@slackmap/core';
import {MapViewChangeData, MAP_ZOOM_THRESHOLD} from '@app/models';
import * as geohash from 'ngeohash';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  public map: any;
  public map$: ReplaySubject<any> = new ReplaySubject(1);
  @ViewChild('mapContainer', {read: ElementRef}) mapContainer: ElementRef;
  @Output() itemClick = new EventEmitter();
  @Output() viewChange = new EventEmitter();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private itemUtils: ItemUtils
  ) {}

  ngOnInit() {
    // this code will work only in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(async () => {

      await LazyLoad.js([
        '/assets/leaflet/leaflet.js',
        '/assets/leaflet/leaflet-customs.js',
        '/assets/leaflet/map.tile.layer.js',
        '/assets/leaflet/satellite.google.tile.layer.js'
      ]);
      L.slackmap.itemUtils = this.itemUtils;
      L.slackmap.SUBTYPES = SUBTYPES;
      L.slackmap.ItemType = ItemType;

      const _map = L.map(this.mapContainer.nativeElement);
      this.map = _map;
      _map.setView([27.916159899896595, -15.604705810546875], 10);
      _map.setView([0, 0], 1);
      const mapTileLayer = L.slackmap.mapTileLayer().addTo(_map);
      const satelliteTileLayer = L.slackmap.satelliteGoogleTileLayer();

      const baseLayers = {
        'Map': mapTileLayer,
        'Satellite': satelliteTileLayer
      };
      const overlays = {
        // 'Slackline': slacklineSpotsLayer
      };
      L.control.layers(baseLayers, overlays).addTo(_map);

      // // minimap
      // const miniMap = new L.Control.GlobeMiniMap().addTo(_map);

      this.setupEvents();

      this.map$.next(_map);
    });

  }

  /**
  * export some events
  */
  setupEvents() {

    /**
     * dispatch map moves
     */
    merge(
      fromEvent(this.map, 'moveend'),
      fromEvent(this.map, 'zoomend')
    ).pipe(
      takeUntil(this.destroy$),
      startWith(1),
      debounceTime(250),
      map(() => {
        const zoom = this.map.getZoom();
        const bbox = this.map.getBounds().limit().toGeoJSONBBox();
        const hashes = (zoom < MAP_ZOOM_THRESHOLD) ? ['clusters'] : geohash.bboxes(bbox[1], bbox[0], bbox[3], bbox[2], 6).sort();
        const data: MapViewChangeData = {
          bounds: this.map.getBounds().limit().toArray(),
          bbox,
          zoom,
          hashes
        };
        return data;
      })
    ).subscribe((data: MapViewChangeData) => {
      this.zone.run(() => {
        this.viewChange.next(data);
      });
    });

    /**
     * dispatch item clicks
     */
    fromEvent(this.map, 'item-click')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((e: any) => {
        this.zone.run(() => {
          this.itemClick.next({item: e.item});
        });
      });
  }


  ngOnDestroy() {
    this.destroy$.next(1);
  }
}
