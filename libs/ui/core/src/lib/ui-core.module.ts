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
import { MenuDirective, MapTopMenuDirective, MapBottomMenuDirective, IfHandsetDirective, IfNotHandsetDirective, HandsetClassDirective } from './directives';
import { IsHandsetPipe, AccessLabelPipe, SubtypeLabelPipe, StatusLabelPipe } from "./pipes";
import { SportFilterSelectComponent } from './components/sport-filter-select/sport-filter-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export const uiCoreRoutes: Route[] = [

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiCoreRoutes),
    StoreModule.forFeature(fromCore.CORE_FEATURE_KEY, fromCore.reducer),
    EffectsModule.forFeature([CoreEffects]),
    LayoutModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
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
  declarations: [
    MenuDirective,
    MapTopMenuDirective,
    MapBottomMenuDirective,
    IfHandsetDirective,
    IfNotHandsetDirective,
    HandsetClassDirective,
    IsHandsetPipe,
    SportFilterSelectComponent,
    AccessLabelPipe,
    SubtypeLabelPipe,
    StatusLabelPipe,
  ],
  exports: [
    MenuDirective,
    MapTopMenuDirective,
    MapBottomMenuDirective,
    IfHandsetDirective,
    IfNotHandsetDirective,
    HandsetClassDirective,
    IsHandsetPipe,
    SportFilterSelectComponent,
    AccessLabelPipe,
    SubtypeLabelPipe,
    StatusLabelPipe,
  ],
})
export class UiCoreModule {}
