import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { API_HOST } from './ui-api-tokens';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenInterceptor } from './jwt-token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: JwtTokenInterceptor
    },
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
