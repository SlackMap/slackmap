import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromMap from './+map/map.reducer';
import { MapEffects } from './+map/map.effects';
import { MapFacade } from './+map/map.facade';
import { MapComponent } from './components/map.component';
import { DrawControlComponent } from './components/draw-control/draw-control.component';
import { SpotsLayerComponent } from './components/spots-layer/spots-layer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { UiAuthModule } from '@slackmap/ui/auth';
import { GeometryInput } from './inputs';
import { ItemClickComponent } from './components/item-click/item-click.component';
import { SetViewComponent } from './components/set-view/set-view.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.reducer),
    EffectsModule.forFeature([MapEffects]),
    MatButtonModule,
    UiAuthModule,
  ],
  declarations: [
    MapComponent,
    DrawControlComponent,
    SpotsLayerComponent,
    GeometryInput,
    ItemClickComponent,
    SetViewComponent,
  ],
  providers: [
    MapFacade,
  ],
  exports: [
    MapComponent,
    DrawControlComponent,
    SpotsLayerComponent,
    GeometryInput,
    ItemClickComponent,
    SetViewComponent,
  ],
})
export class UiMapModule {}
