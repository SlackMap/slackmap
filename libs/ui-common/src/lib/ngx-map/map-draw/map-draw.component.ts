import {Component, OnInit, Output, EventEmitter, Input, NgZone, OnDestroy} from '@angular/core';
import {MapComponent} from '../map/map.component';
import {LazyLoad} from '@app/services/lazy-load';
import {ShapeData} from '@app/models';
import {SpotCategory} from '@slackmap/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
@Component({
  selector: 'ngx-map-draw',
  templateUrl: './map-draw.component.html',
  styleUrls: ['./map-draw.component.css']
})
export class MapDrawComponent implements OnInit, OnDestroy {


  private destroy$ = new Subject();
  @Output() changes = new EventEmitter<ShapeData>();
  @Input() shape: any;
  @Input() category: SpotCategory;
  private handler: any;

  constructor(private map: MapComponent, private zone: NgZone) {}

  ngOnInit() {
    this.map.map$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(map => {

      this.zone.runOutsideAngular(async () => {
        await LazyLoad.js([
          '/assets/leaflet-draw/leaflet.draw.js',
          '/assets/leaflet/leaflet-draw-customs.js',
          '/assets/leaflet/draw-handler.js',
        ]);
        this.handler = L.slackmap.drawHandler(map, this.category, this.shape, (data) => {
          this.zone.run(() => {
            this.changes.next(data);
          });
        });

      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    if (this.handler) {
      this.zone.runOutsideAngular(() => {
        this.handler.destroy();
      });
    }
  }

  undo() {
    if (this.handler) {
      this.zone.runOutsideAngular(() => {
        this.handler.undo();
      });
    }
  }
  complete() {
    if (this.handler) {
      this.zone.runOutsideAngular(() => {
        this.handler.complete();
      });
    }
  }
  reset() {
    if (this.handler) {
      this.zone.runOutsideAngular(() => {
        this.handler.reset();
      });
    }
  }

}
