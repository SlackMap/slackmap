import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UiConfig } from './ui-config';
import { ConfigModel } from '@slackmap/api-client';
import { Store, createAction } from '@ngrx/store';
export const appConfigInit = createAction('[Config] Init');

@NgModule({

})
export class UiConfigModule {
  static forRoot(options: {production: boolean}): ModuleWithProviders {
    return {
      ngModule: UiConfigModule,
      providers: [
        UiConfig,
        {
          provide: APP_INITIALIZER,
          useFactory: function(config: UiConfig, document: Document, store: Store) {

            config.isProduction = options.production;

            return async function() {
              let conf: ConfigModel = {} as any;
              if(document.defaultView.fetch) {
                conf = await fetch('/config.json').then(res => res.json()).catch(err => ({}));
              }
              Object.assign(config, conf);
              store.dispatch(appConfigInit())
            }
          },
          deps: [UiConfig, DOCUMENT, Store],
          multi: true
        },
      ]
    }
  }
}
