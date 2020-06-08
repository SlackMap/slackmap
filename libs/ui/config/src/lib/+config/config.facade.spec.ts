import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ConfigEntity } from './config.models';
import { ConfigEffects } from './config.effects';
import { ConfigFacade } from './config.facade';

import * as ConfigSelectors from './config.selectors';
import * as ConfigActions from './config.actions';
import {
  CONFIG_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './config.reducer';

interface TestSchema {
  config: State;
}

describe('ConfigFacade', () => {
  let facade: ConfigFacade;
  let store: Store<TestSchema>;
  const createConfigEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ConfigEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONFIG_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ConfigEffects]),
        ],
        providers: [ConfigFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ConfigFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allConfig$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ConfigActions.loadConfig());

        list = await readFirst(facade.allConfig$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadConfigSuccess` to manually update list
     */
    it('allConfig$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allConfig$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ConfigActions.loadConfigSuccess({
            config: [createConfigEntity('AAA'), createConfigEntity('BBB')],
          })
        );

        list = await readFirst(facade.allConfig$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
