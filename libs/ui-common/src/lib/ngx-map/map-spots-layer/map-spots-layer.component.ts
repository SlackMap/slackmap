import {Component, OnInit, Input, OnDestroy, NgZone, OnChanges, SimpleChange} from '@angular/core';
import {MapComponent} from '../map/map.component';
// import {clusters} from '@app/map/clusters';
import {LazyLoad} from '@slackmap/ui-core';
import {Subject, ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ngx-map-spots-layer',
  templateUrl: './map-spots-layer.component.html',
  styleUrls: ['./map-spots-layer.component.css']
})
export class MapSpotsLayerComponent implements OnInit, OnDestroy, OnChanges {


  private destroy$ = new Subject();
  private layer: any;
  @Input() spots: any[];
  private spots$ = new ReplaySubject<any[]>(1);
  constructor(private map: MapComponent, private zone: NgZone) {}

  async ngOnInit() {
    this.map.map$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(map => {
      this.zone.runOutsideAngular(async () => {
        await LazyLoad.js([
          '/assets/leaflet/markers/area.marker.js',
          '/assets/leaflet/markers/cluster-counts.marker.js',
          '/assets/leaflet/markers/line.marker.js',
          '/assets/leaflet/markers/location.marker.js',
          '/assets/leaflet/markers/poi.marker.js',
          '/assets/leaflet/markers/marker-factory.js',
          '/assets/leaflet/spots.layer.js',
        ]);
        this.layer = new L.slackmap.SpotsLayer();
        this.layer.addTo(map);
        this.spots$.pipe(takeUntil(this.destroy$)).subscribe(spots => {
          console.log('spots to display', spots);
          this.layer.setSpots(spots);
        });

      });
    });
  }
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (changes.hasOwnProperty('spots')) {
      this.spots$.next(changes['spots'].currentValue);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(1);
    if (this.layer) {
      this.zone.runOutsideAngular(() => {
        this.map.map.removeLayer(this.layer);
      });
    }
  }
}
