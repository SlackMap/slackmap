import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { UiPwaModule } from '@slackmap/ui/pwa';
import { UiCoreModule, MergedRouterStateSerializer, ROUTER_FEATURE_KEY } from '@slackmap/ui/core';
import { UiConfigModule } from '@slackmap/ui/config';
import { UiStorageModule } from '@slackmap/ui/storage';
import { UiLayoutModule } from '@slackmap/ui/layout';
import { UiAuthModule } from '@slackmap/ui/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        [ROUTER_FEATURE_KEY]: routerReducer
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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({
      serializer: MergedRouterStateSerializer,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // enabled: false,
      registrationStrategy: 'registerImmediately'
    }),
    UiConfigModule.forRoot({production: environment.production}),
    UiPwaModule.forRoot({ enabled: environment.production }),
    UiCoreModule,
    UiStorageModule,
    UiLayoutModule,
    UiAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

