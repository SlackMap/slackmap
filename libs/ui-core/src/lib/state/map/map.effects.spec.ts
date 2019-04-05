import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MapEffects } from './map.effects';

describe('MapEffects', () => {
  let actions$: Observable<any>;
  let effects: MapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MapEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
