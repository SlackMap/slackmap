import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { StorageService, StorageMockService } from '@slackmap/ui/core';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [{
    provide: StorageService,
    useClass: StorageMockService,
  }],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
