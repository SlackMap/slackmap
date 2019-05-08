import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';

import { userQuery } from './user.selectors';
import { LoadUser, UserLoaded } from './user.actions';
import { UserState, Entity, userInitialState, userReducer } from './user.reducer';

interface TestSchema {
  user: UserState;
}

describe('UserFacade', () => {
  let facade: UserFacade;
  let store: Store<TestSchema>;
  let createUser;

  beforeEach(() => {
    createUser = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('user', userReducer, { initialState: userInitialState }),
          EffectsModule.forFeature([UserEffects]),
        ],
        providers: [UserFacade],
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
      facade = TestBed.get(UserFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allUser$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allUser$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `UserLoaded` to manually submit list for state management
     */
    it('allUser$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allUser$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(new UserLoaded([createUser('AAA'), createUser('BBB')]));

        list = await readFirst(facade.allUser$);
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
