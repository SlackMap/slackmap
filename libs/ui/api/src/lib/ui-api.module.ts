import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { API_HOST } from './ui-api-tokens';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: API_HOST,
      useFactory: (document) => {
        const host = document.location.hostname;
        switch (host) {
          case 'slackmap.com':
            return 'https://api.slackmap.com';
            break;
          case 'stage.slackmap.com':
            return 'https://stage-api.slackmap.com';
            break;
          case 'test.slackmap.com':
            return 'https://test-api.slackmap.com';
            break;

          default:
            return 'http://localhost:3333';
            break;
        }
      },
      deps: [DOCUMENT]
    }
  ],
  exports: []
})
export class UiApiModule { }
