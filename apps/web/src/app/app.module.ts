import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiPwaModule } from '@slackmap/ui/pwa';
import { UiCoreModule } from '@slackmap/ui/core';
import { UiConfigModule } from '@slackmap/ui/config';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { UiStorageModule } from '@slackmap/ui/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // enabled: false,
      registrationStrategy: 'registerImmediately'
    }),
    UiConfigModule.forRoot({production: environment.production}),
    UiPwaModule.forRoot({ enabled: environment.production }),
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        router: routerReducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
    UiCoreModule,
    UiStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

