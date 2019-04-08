import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateModule } from '@slackmap/ui-common';
import { UiCommonModule } from '@slackmap/ui-common';
import { UiCoreModule } from '@slackmap/ui-core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { NxModule } from '@nrwl/nx';
import { NgxMapModule } from "@slackmap/ui-common";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'home', loadChildren: '@slackmap/ui-core/pages/home#HomeModule' },
      // { path: 'map', redirectTo: 'x', pathMatch: 'full' },
      // { path: 'map/', redirectTo: 'x', pathMatch: 'full' },
      // { path: 'x/', redirectTo: 'x', pathMatch: 'full' },
      // { path: 'x', loadChildren: '@slackmap/ui-core/pages/map#MapModule' },
    ], { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    UpdateModule.forRoot({ enabled: environment.production }),
    UiCommonModule,
    HttpClientModule,
    UiCoreModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule,
    NgxMapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
