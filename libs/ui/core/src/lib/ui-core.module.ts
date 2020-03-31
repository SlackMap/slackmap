import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCore from './+state/core.reducer';
import { CoreEffects } from './+state/core.effects';
import { CoreFacade } from './+state/core.facade';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MapComponent } from './components/map/map.component';
import { UiMapModule} from '@slackmap/ui/map';
import { ItemUtils } from '@slackmap/core';
import { UiApiModule, API_HOST } from '@slackmap/ui/api';

export const uiCoreRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.reducer),
    EffectsModule.forFeature([CoreEffects]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    UiMapModule,
    UiApiModule,
  ],
  providers: [
    CoreFacade,
    {
      provide: ItemUtils,
      useFactory: (host) => {
        const utils = new ItemUtils();
        utils.setHost(host);
        return utils;
      },
      deps: [API_HOST]
    }
  ],
  declarations: [LayoutComponent, MapComponent],
  exports: [LayoutComponent]
})
export class UiCoreModule {}
