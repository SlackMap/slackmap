import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UiConfig } from './ui-config';
import { ConfigModel } from '@slackmap/api/config/dto';
import { StorageService, APP_CONFIG_KEY } from '@slackmap/ui/storage';
import { Store, createAction, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromConfig from './+config/config.reducer';
import { ConfigEffects } from './+config/config.effects';
import { ConfigFacade } from './+config/config.facade';
export const appConfigInit = createAction('[Config] Init');

@NgModule({
  imports: [
    EffectsModule.forFeature([ConfigEffects]),
    StoreModule.forFeature(fromConfig.CONFIG_FEATURE_KEY, fromConfig.reducer)
  ],
  providers: [ConfigFacade],
})
export class UiConfigModule {
  static forRoot(options: {production: boolean}): ModuleWithProviders {
    return {
      ngModule: UiConfigModule,
      providers: [
        UiConfig,
        {
          provide: APP_INITIALIZER,
          useFactory: function(config: UiConfig, document: Document, store: Store, storage: StorageService) {

            function showDialog() {
              return new Promise((resolve, reject) => {
                if(document.defaultView.alert) {
                  document.defaultView.alert(`Can't load APP_CONFIG\nProbably You are offline, just run the app when online\n\nClick OK to try again`);
                  document.defaultView.location.reload();
                } else {
                  reject(new Error('Cant load /config.json'))
                }
              })
            }

            config.isProduction = options.production;

            return async function() {
              let conf: ConfigModel = {} as any;
              if(document.defaultView.fetch) {
                conf = await fetch('/config.json')
                .then(res => res.json())
                .then(data => {
                  storage.set(APP_CONFIG_KEY, data).subscribe({error: err => {}});
                  return data;
                })
                .catch(err => storage.get(APP_CONFIG_KEY).toPromise().then(c => c ? c : Promise.reject(err)))
                .catch(err => showDialog());
              }
              Object.assign(config, conf);
              store.dispatch(appConfigInit())
            }
          },
          deps: [UiConfig, DOCUMENT, Store, StorageService],
          multi: true
        },
      ]
    }
  }
}
