import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCore from './+core/core.reducer';
import { CoreEffects } from './+core/core.effects';
import { CoreFacade } from './+core/core.facade';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MapComponent } from './components/map/map.component';
import { UiMapModule } from '@slackmap/ui/map';
import { ItemUtils } from '@slackmap/core';
import { UiApiModule } from '@slackmap/ui/api';
import * as fromMap from './+map/map.reducer';
import { MapEffects } from './+map/map.effects';
import { MapFacade } from './+map/map.facade';
import * as fromSpots from './+spot/spot.reducer';
import { SpotEffects } from './+spot/spot.effects';
import { SpotFacade } from './+spot/spot.facade';
import { HomePage } from './pages/home/home.page';
import { XPage } from './pages/x/x.page';
import { LayerFiltersComponent } from './components/layer-filters/layer-filters.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DrawControlComponent } from './components/map/draw-control/draw-control.component';
import { SpotsLayerComponent } from './components/map/spots-layer/spots-layer.component';
import { DrawHandlerComponent } from './components/map/draw-handler/draw-handler.component';
import { UiConfig } from '@slackmap/ui/config';
import { UiAuthModule } from './auth';
import { LoaderModule } from '@slackmap/ui/common/loader';
import { ErrorsModule } from '@slackmap/ui/common/errors';

export const uiCoreRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HomePage },
  { path: 'x/', redirectTo: 'x', pathMatch: 'full' },
  { path: 'x', component: XPage },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiCoreRoutes),
    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.reducer),
    EffectsModule.forFeature([CoreEffects]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    UiMapModule,
    UiApiModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.reducer),
    EffectsModule.forFeature([MapEffects]),
    StoreModule.forFeature(fromSpots.SPOT_FEATURE_KEY, fromSpots.reducer),
    EffectsModule.forFeature([SpotEffects]),
    UiAuthModule,
    LoaderModule,
    ErrorsModule,
  ],
  providers: [
    CoreFacade,
    {
      provide: ItemUtils,
      useFactory: (config: UiConfig) => {
        const utils = new ItemUtils();
        utils.setHost(config.APP_HOST);
        return utils;
      },
      deps: [UiConfig],
    },
    MapFacade,
    SpotFacade,
  ],
  declarations: [
    LayoutComponent,
    MapComponent,
    HomePage,
    XPage,
    LayerFiltersComponent,
    DrawControlComponent,
    SpotsLayerComponent,
    DrawHandlerComponent,
  ],
  exports: [LayoutComponent],
})
export class UiCoreModule {}
