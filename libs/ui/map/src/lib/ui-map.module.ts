import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromMap from './+map/map.reducer';
import { MapEffects } from './+map/map.effects';
import { MapFacade } from './+map/map.facade';
import { MapComponent } from './components/map.component';
import { DrawControlComponent } from './components/draw-control/draw-control.component';
import { SpotsLayerComponent } from './components/spots-layer/spots-layer.component';
import { DrawHandlerComponent } from './components/draw-handler/draw-handler.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.reducer),
    EffectsModule.forFeature([MapEffects]),
  ],
  declarations: [
    MapComponent,
    DrawControlComponent,
    SpotsLayerComponent,
    DrawHandlerComponent,
  ],
  providers: [
    MapFacade,
  ],
  exports: [
    MapComponent,
    DrawControlComponent,
    SpotsLayerComponent,
    DrawHandlerComponent,
  ],
})
export class UiMapModule {}
