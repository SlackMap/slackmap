import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpotsEffects } from './spots.effects';

describe('SpotsEffects', () => {
  let actions$: Observable<any>;
  let effects: SpotsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpotsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SpotsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
