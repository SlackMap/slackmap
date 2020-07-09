import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MapService } from '../../map.service';
import { SpotItem } from '@slackmap/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { untilDestroy } from '@ngrx-utils/store';

@Component({
  selector: 'map-spots-layer',
  template: ``,
  styles: []
})
export class SpotsLayerComponent implements OnInit, OnDestroy {

  spots$$ = new BehaviorSubject<SpotItem[]>([]);

  @Input()
  set spots(spots: SpotItem[]) {
    this.spots$$.next(spots ? spots : []);
  }

  @Input()
  set spot(spot: SpotItem) {
    console.log('spot', spot)
    this.spots$$.next(spot ? [spot] : []);
  }

  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
    this.mapService.spotsLayer(this.spots$$.asObservable()).pipe(
      untilDestroy(this),
    ).subscribe();
  }

  ngOnDestroy() {}
}
