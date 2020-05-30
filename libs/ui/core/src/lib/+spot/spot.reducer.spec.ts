import * as SpotsActions from './spot.actions';
import { SpotState, initialState, reducer } from './spot.reducer';

describe('Spots Reducer', () => {

  beforeEach(() => {});

  describe('valid Spots actions', () => {
    // it('loadSpotsSuccess should return set the list of known Spots', () => {
    //   const spots = [
    //     createSpotsEntity('PRODUCT-AAA'),
    //     createSpotsEntity('PRODUCT-zzz')
    //   ];
    //   const action = SpotsActions.loadSpotsSuccess({ spots });

    //   const result: State = reducer(initialState, action);

    //   expect(result.loaded).toBe(true);
    //   expect(result.ids.length).toBe(2);
    // });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
