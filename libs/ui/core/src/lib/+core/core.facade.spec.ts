import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CoreEntity } from './core.models';
import { CoreEffects } from './core.effects';
import { CoreFacade } from './core.facade';

import * as CoreSelectors from './core.selectors';
import * as CoreActions from './core.actions';
import { CORE_FEATURE_KEY, State, initialState, reducer } from './core.reducer';

interface TestSchema {
  core: State;
}

describe('CoreFacade', () => {
  let facade: CoreFacade;
  let store: Store<TestSchema>;
  const createCoreEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as CoreEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CORE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CoreEffects])
        ],
        providers: [CoreFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CoreFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    // it('loadAll() should return empty list with loaded == true', async done => {
    //   try {
    //     let list = await readFirst(facade.allCore$);
    //     let isLoaded = await readFirst(facade.loaded$);

    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(false);

    //     facade.dispatch(CoreActions.loadCore());

    //     list = await readFirst(facade.allCore$);
    //     isLoaded = await readFirst(facade.loaded$);

    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(true);

    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });

    /**
     * Use `loadCoreSuccess` to manually update list
     */
    // it('allCore$ should return the loaded list; and loaded flag == true', async done => {
    //   try {
    //     let list = await readFirst(facade.allCore$);
    //     let isLoaded = await readFirst(facade.loaded$);

    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(false);

    //     facade.dispatch(
    //       CoreActions.loadCoreSuccess({
    //         core: [createCoreEntity('AAA'), createCoreEntity('BBB')]
    //       })
    //     );

    //     list = await readFirst(facade.allCore$);
    //     isLoaded = await readFirst(facade.loaded$);

    //     expect(list.length).toBe(2);
    //     expect(isLoaded).toBe(true);

    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });
  });
});
