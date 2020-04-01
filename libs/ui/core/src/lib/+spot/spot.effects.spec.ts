import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SpotEffects } from './spot.effects';
import * as SpotsActions from './spot.actions';

describe('SpotsEffects', () => {
  let actions: Observable<any>;
  let effects: SpotEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SpotEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(SpotEffects);
  });

  describe('loadSpots$', () => {
    // it('should work', () => {
    //   actions = hot('-a-|', { a: SpotsActions.loadSpots() });

    //   const expected = hot('-a-|', {
    //     a: SpotsActions.loadSpotsSuccess({ spots: [] })
    //   });

    //   expect(effects.loadSpots$).toBeObservable(expected);
    // });
  });
});
