import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { StorageService, StorageMockService } from '@slackmap/ui/core';
import { UiConfig } from '@slackmap/ui/config';
import { ConfigModel } from '@slackmap/api-client';


const config: ConfigModel = {
  APP_HOST: process.env.APP_HOST,
  API_HOST: process.env.API_HOST,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_SCOPE: (process.env.FACEBOOK_SCOPE || '').split(','),
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [{
    provide: StorageService,
    useClass: StorageMockService,
  },{
    provide: UiConfig,
    useValue: config,
  }],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
