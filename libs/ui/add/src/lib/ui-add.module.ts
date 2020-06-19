import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
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
import { SubtypeInput } from './inputs/subtype/subtype.input';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DistanceInput } from './inputs/distance/distance.input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UiCoreModule } from '@slackmap/ui/core';

const uiAddRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: AddPage},
  {path: ':sportName', pathMatch: 'full', component: AddPage},
  {path: ':sportName/:drawType', pathMatch: 'full', component: AddPage},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiAddRoutes),
    StoreModule.forFeature(fromAdd.ADD_FEATURE_KEY, fromAdd.reducer),
    EffectsModule.forFeature([AddEffects]),
    UiAuthModule,
    UiMapModule,
    UiCoreModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    NgLetModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  providers: [AddFacade],
  declarations: [
    AddPage,
    SportSelectComponent,
    SlacklineForm,
    SubtypeInput,
    DistanceInput,
  ],
})
export class UiAddModule {}
