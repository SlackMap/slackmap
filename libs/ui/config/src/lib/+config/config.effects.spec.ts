import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ConfigEffects } from './config.effects';
import * as ConfigActions from './config.actions';

describe('ConfigEffects', () => {
  let actions: Observable<any>;
  let effects: ConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ConfigEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ConfigEffects);
  });

  describe('loadConfig$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ConfigActions.loadConfig() });

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigSuccess({ config: [] }),
      });

      expect(effects.loadConfig$).toBeObservable(expected);
    });
  });
});
