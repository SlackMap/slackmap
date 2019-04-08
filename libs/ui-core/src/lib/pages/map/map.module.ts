import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'map', redirectTo: 'x', pathMatch: 'full' },
      { path: 'map/', redirectTo: 'x', pathMatch: 'full' },
      { path: 'x/', redirectTo: 'x', pathMatch: 'full' },
      { path: 'x', component: MapComponent},
    ])
  ]
})
export class MapModule { }
