import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import * as fromSpots from './+spot/spot.reducer';
import { SpotEffects } from './+spot/spot.effects';
import { SpotFacade } from './+spot/spot.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { XPage } from './pages';
import { LayerFiltersComponent } from './components';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsModule } from '@slackmap/ui/common/errors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UiCoreModule } from '@slackmap/ui/core';

export const uiSpotRoutes: Route[] = [
  { path: 'x/', redirectTo: 'x', pathMatch: 'full' },
  { path: 'x', component: XPage },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiSpotRoutes),
    StoreModule.forFeature(fromSpots.SPOT_FEATURE_KEY, fromSpots.reducer),
    EffectsModule.forFeature([SpotEffects]),
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorsModule,
    UiCoreModule,
  ],
  providers: [
    SpotFacade,
  ],
  declarations: [
    LayerFiltersComponent,
    XPage,
  ]
})
export class UiSpotModule {}
