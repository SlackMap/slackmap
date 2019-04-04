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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    UpdateModule.forRoot({enabled: environment.production}),
    UiCommonModule,
    HttpClientModule,
    UiCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
