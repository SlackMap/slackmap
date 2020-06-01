import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAdd from './+add/add.reducer';
import { AddEffects } from './+add/add.effects';
import { AddFacade } from './+add/add.facade';
import { AddPage } from './pages/add/add.page';
import { UiAuthModule } from '@slackmap/ui/auth';
import { UiMapModule } from '@slackmap/ui/map';

@NgModule({
  imports: [
    CommonModule,
    UiAuthModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AddPage}
    ]),
    StoreModule.forFeature(fromAdd.ADD_FEATURE_KEY, fromAdd.reducer),
    EffectsModule.forFeature([AddEffects]),
    UiMapModule,
  ],
  providers: [AddFacade],
  declarations: [AddPage],
})
export class UiAddModule {}
