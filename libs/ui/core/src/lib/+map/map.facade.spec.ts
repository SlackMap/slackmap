import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { MapEntity } from './map.models';
import { MapEffects } from './map.effects';
import { MapFacade } from './map.facade';

import * as MapSelectors from './map.selectors';
import * as MapActions from './map.actions';
import { MAP_FEATURE_KEY, State, initialState, reducer } from './map.reducer';

interface TestSchema {
  map: State;
}

describe('MapFacade', () => {
  let facade: MapFacade;
  let store: Store<TestSchema>;
  const createMapEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MapEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MAP_FEATURE_KEY, reducer),
          EffectsModule.forFeature([MapEffects])
        ],
        providers: [MapFacade]
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
      facade = TestBed.get(MapFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allMap$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(MapActions.loadMap());

        list = await readFirst(facade.allMap$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadMapSuccess` to manually update list
     */
    it('allMap$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allMap$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          MapActions.loadMapSuccess({
            map: [createMapEntity('AAA'), createMapEntity('BBB')]
          })
        );

        list = await readFirst(facade.allMap$);
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
