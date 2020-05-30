import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SpotEffects } from './spot.effects';
import { SpotFacade } from './spot.facade';

import * as SpotsSelectors from './spot.selectors';
import * as SpotsActions from './spot.actions';
import {
  SPOT_FEATURE_KEY,
  SpotState,
  initialState,
  reducer
} from './spot.reducer';

interface TestSchema {
  spots: SpotState;
}

describe('SpotsFacade', () => {
  let facade: SpotFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SPOT_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SpotEffects])
        ],
        providers: [SpotFacade]
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
      facade = TestBed.get(SpotFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      // try {
      //   let list = await readFirst(facade.allSpots$);
      //   let isLoaded = await readFirst(facade.loaded$);

      //   expect(list.length).toBe(0);
      //   expect(isLoaded).toBe(false);

      //   facade.dispatch(SpotsActions.loadSpots());

      //   list = await readFirst(facade.allSpots$);
      //   isLoaded = await readFirst(facade.loaded$);

      //   expect(list.length).toBe(0);
      //   expect(isLoaded).toBe(true);

      //   done();
      // } catch (err) {
      //   done.fail(err);
      // }
    });

    /**
     * Use `loadSpotsSuccess` to manually update list
     */
    it('allSpots$ should return the loaded list; and loaded flag == true', async done => {
      // try {
      //   let list = await readFirst(facade.allSpots$);
      //   let isLoaded = await readFirst(facade.loaded$);

      //   expect(list.length).toBe(0);
      //   expect(isLoaded).toBe(false);

      //   facade.dispatch(
      //     SpotsActions.loadSpotsSuccess({
      //       spots: [createSpotsEntity('AAA'), createSpotsEntity('BBB')]
      //     })
      //   );

      //   list = await readFirst(facade.allSpots$);
      //   isLoaded = await readFirst(facade.loaded$);

      //   expect(list.length).toBe(2);
      //   expect(isLoaded).toBe(true);

      //   done();
      // } catch (err) {
      //   done.fail(err);
      // }
    });
  });
});
