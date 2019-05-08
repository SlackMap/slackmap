import { reducer, mapInitialState } from './map.reducer';

describe('Map Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(mapInitialState, action);

      expect(result).toBe(mapInitialState);
    });
  });
});
