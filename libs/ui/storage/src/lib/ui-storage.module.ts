import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

export const uiStorageRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicStorageModule.forRoot(),
  ],
})
export class UiStorageModule {}
