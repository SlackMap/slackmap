import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AddEffects } from './add.effects';
import * as AddActions from './add.actions';

describe('AddEffects', () => {
  let actions: Observable<any>;
  let effects: AddEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AddEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(AddEffects);
  });

  describe('loadAdd$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AddActions.loadAdd() });

      const expected = hot('-a-|', {
        a: AddActions.loadAddSuccess({ add: [] }),
      });

      expect(effects.loadAdd$).toBeObservable(expected);
    });
  });
});
