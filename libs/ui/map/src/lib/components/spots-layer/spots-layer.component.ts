import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map.service';

@Component({
  selector: 'map-spots-layer',
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
