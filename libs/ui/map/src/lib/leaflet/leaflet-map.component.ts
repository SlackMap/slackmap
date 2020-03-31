import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID, NgZone, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as L from "leaflet";
import { restoreView } from './plugins/leaflet.restoreview';
import { leafletCustoms } from './map/leaflet-customs';
import { mapTileLayer } from './layers/map.tile.layer';
import { satelliteGoogleTileLayer } from './layers/satellite.google.tile.layer';
import { SpotsLayer } from './layers/spots.layer';
import { ItemUtils } from '@slackmap/core';
import { clusters } from '../clusters';

restoreView();
leafletCustoms();

@Component({
  selector: 'sm-leaflet-map',
  template: `
    <div #mapContainer class="map-container">
      <span class="map-loader" *ngIf="!map">Loading map...</span>
    </div>
  `,
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
    }
    .map-loader {
      padding: 10px;
      display: block;
      width: 200px;
      margin: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements AfterViewInit {
  public map: any;
  @ViewChild('mapContainer', {read: ElementRef, static: true}) mapContainer: ElementRef;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private itemUtils: ItemUtils
  ) {}

  ngAfterViewInit(): void {
    // this code will work only in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(async () => {

      // L.slackmap.itemUtils = this.itemUtils;
      // L.slackmap.SUBTYPES = SUBTYPES;
      // L.slackmap.ItemType = ItemType;

      const _map = L.map(this.mapContainer.nativeElement);
      this.map = _map;
      // if (!_map.restoreView()) {
        // _map.setView([27.916159899896595, -15.604705810546875], 10);
        _map.setView([0, 0], 1);
      // }
      const mapTileLayerInstance = mapTileLayer().addTo(_map);
      const satelliteTileLayerInstance = satelliteGoogleTileLayer();
      const slacklineSpotsLayer = new SpotsLayer(this.itemUtils);
      const baseLayers = {
        'Map': mapTileLayerInstance,
        'Satellite': satelliteTileLayerInstance
      };
      const overlays = {
        'Slackline': slacklineSpotsLayer
      };
      L.control.layers(baseLayers, overlays).addTo(_map);
      slacklineSpotsLayer.setSpots(clusters.clusters)
      // // minimap
      // const miniMap = new L.Control.GlobeMiniMap().addTo(_map);

      // this.setupEvents();

      // this.map$.next(_map);
      this.cd.detectChanges()
    });

  }

}
