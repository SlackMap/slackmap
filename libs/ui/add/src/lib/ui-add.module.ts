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
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SportSelectComponent } from './components/sport-select/sport-select.component';
import { NgLetModule } from '@ngrx-utils/store';
import { SlacklineForm } from './forms/slackline/slackline.form';
import { SlacklineAreaForm } from './forms/slackline-area/slackline-area.form';
import { SlacklineLineForm } from './forms/slackline-line/slackline-line.form';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AddPage}
    ]),
    StoreModule.forFeature(fromAdd.ADD_FEATURE_KEY, fromAdd.reducer),
    EffectsModule.forFeature([AddEffects]),
    UiAuthModule,
    UiMapModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    NgLetModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  providers: [AddFacade],
  declarations: [
    AddPage,
    SportSelectComponent,
    SlacklineForm,
    SlacklineAreaForm,
    SlacklineLineForm,
  ],
})
export class UiAddModule {}
