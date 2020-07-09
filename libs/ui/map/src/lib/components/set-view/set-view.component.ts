import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../map.service';
import { ViewOptions, FitFeaturesOptions } from '../../+map';
import { AllGeoJSON } from '@turf/turf';

@Component({
  selector: 'map-set-view',
  template: ``,
  styles: []
})
export class SetViewComponent implements OnInit {

  @Input()
  set view(view: ViewOptions) {
    if(view) {
      this.mapService.setView(view);
    }
  };

  @Input()
  set fit(features: AllGeoJSON) {
    if(features) {
      this.mapService.fitFeatures({features});
    }
  };

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
  }

}
