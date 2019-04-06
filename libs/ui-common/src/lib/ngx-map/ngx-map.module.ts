import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapSpotsLayerComponent } from './map-spots-layer/map-spots-layer.component';
import { MapDrawComponent } from './map-draw/map-draw.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapComponent, MapSpotsLayerComponent, MapDrawComponent],
  exports: [MapComponent, MapSpotsLayerComponent, MapDrawComponent]
})
export class NgxMapModule { }
