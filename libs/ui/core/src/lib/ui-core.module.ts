import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCore from './+core/core.reducer';
import { CoreEffects } from './+core/core.effects';
import { CoreFacade } from './+core/core.facade';
import { LayoutModule } from '@angular/cdk/layout';
import { ItemUtils } from '@slackmap/core';
import { UiConfig } from '@slackmap/ui/config';

export const uiCoreRoutes: Route[] = [

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiCoreRoutes),
    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.reducer),
    EffectsModule.forFeature([CoreEffects]),
    LayoutModule,
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
  ],
  declarations: [],
  exports: [],
})
export class UiCoreModule {}
