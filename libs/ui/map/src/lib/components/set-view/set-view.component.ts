import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../map.service';
import { ViewOptions, FitFeaturesOptions } from '../../+map';

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
  set fit(view: FitFeaturesOptions) {
    if(view) {
      this.mapService.fitFeatures(view);
    }
  };

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {
  }

}
