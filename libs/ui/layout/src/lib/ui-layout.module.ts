import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
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
import { HomePage } from './pages';
import { UiSpotModule } from '@slackmap/ui/spot';

export const uiLayoutRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HomePage },
  { path: 'add', loadChildren: () => import('@slackmap/ui/add').then(m => m.UiAddModule) },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(uiLayoutRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    LoaderModule,
    UiMapModule,
    UiSpotModule,
  ],
  declarations: [
    MapLayout,
    HomePage
  ],
  exports: [MapLayout],
})
export class UiLayoutModule {}
