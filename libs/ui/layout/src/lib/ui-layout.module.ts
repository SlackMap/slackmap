import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapLayout } from './layouts/map/map.layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { UiMapModule } from '@slackmap/ui/map';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoaderModule } from '@slackmap/ui/common/loader';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    UiMapModule,
    LoaderModule,
  ],
  declarations: [MapLayout],
  exports: [MapLayout],
})
export class UiLayoutModule {}
