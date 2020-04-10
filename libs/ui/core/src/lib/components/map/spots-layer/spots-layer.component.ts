import { Component, OnInit } from '@angular/core';
import { MapService } from '@slackmap/ui/map';

@Component({
  selector: 'sm-map-spots-layer',
  template: ``,
  styles: []
})
export class SpotsLayerComponent implements OnInit {

  constructor(
    private map: MapService
  ) { }

  ngOnInit(): void {
  }

}
