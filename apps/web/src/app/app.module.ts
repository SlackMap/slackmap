import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateModule } from '@slackmap/ui/common';
import { UiCommonModule } from '@slackmap/ui/common';
import { UiCoreModule, API_HOST } from '@slackmap/ui/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { NxModule } from '@nrwl/nx';
import { NgxMapModule } from "@slackmap/ui/common";
import { ItemUtils } from '@slackmap/core';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    UpdateModule.forRoot({ enabled: environment.production }),
    UiCommonModule,
    HttpClientModule,
    UiCoreModule,
    NxModule.forRoot(),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(
      {},
      { metaReducers: !environment.production ? [storeFreeze] : [] },
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule,
    NgxMapModule
  ],
  providers: [
    {
      provide: API_HOST,
      useValue: 'https://test-api.slackmap.com/api/v2'
    },
    {
      provide: ItemUtils,
      useFactory: (host) => {
        const utils = new ItemUtils();
        utils.setHost(host); // TODO set it from environements
        return utils;
      },
      deps: [API_HOST]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
