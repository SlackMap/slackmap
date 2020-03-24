import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CoreEffects } from './core.effects';
import * as CoreActions from './core.actions';

describe('CoreEffects', () => {
  let actions: Observable<any>;
  let effects: CoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CoreEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(CoreEffects);
  });

  describe('loadCore$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CoreActions.loadCore() });

      const expected = hot('-a-|', {
        a: CoreActions.loadCoreSuccess({ core: [] })
      });

      expect(effects.loadCore$).toBeObservable(expected);
    });
  });
});
