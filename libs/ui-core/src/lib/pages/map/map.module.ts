import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapPageComponent } from './map-page/map-page.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { NgxMapModule } from "@slackmap/ui-common";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpotFilterComponent } from './components/spot-filter/spot-filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapPageComponent, SpotFilterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'map', redirectTo: 'x', pathMatch: 'full' },
      { path: 'map/', redirectTo: 'x', pathMatch: 'full' },
      { path: 'x/', redirectTo: 'x', pathMatch: 'full' },
      { path: 'x', component: MapPageComponent},
    ]),
    NgxMapModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ]
})
export class MapModule { }
