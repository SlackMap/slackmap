import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import * as fromSpots from './+spot/spot.reducer';
import { SpotEffects } from './+spot/spot.effects';
import { SpotFacade } from './+spot/spot.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { XPage } from './pages';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsModule } from '@slackmap/ui/common/errors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UiCoreModule } from '@slackmap/ui/core';
import { UiAuthModule } from '@slackmap/ui/auth';
import { UiMapModule } from '@slackmap/ui/map';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgLetModule } from '@ngrx-utils/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export const uiSpotRoutes: Route[] = [
  { path: 'x/', redirectTo: 's', pathMatch: 'full' },
  { path: 'x', redirectTo: 's', pathMatch: 'full' },
  { path: 's/', redirectTo: 's', pathMatch: 'full' },
  { path: 's', component: XPage },
  { path: 's/:sportNames', component: XPage },
  { path: 's/:sportNames/:subtypeNames', component: XPage },
  { path: 'x/:rid', component: XPage },
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
    UiAuthModule,
    UiMapModule,
    MatButtonModule,
    MatCardModule,
    NgLetModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    SpotFacade,
  ],
  declarations: [
    XPage,
  ]
})
export class UiSpotModule {}
