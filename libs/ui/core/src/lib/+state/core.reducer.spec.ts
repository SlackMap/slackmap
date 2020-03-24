import { CoreEntity } from './core.models';
import * as CoreActions from './core.actions';
import { State, initialState, reducer } from './core.reducer';

describe('Core Reducer', () => {
  const createCoreEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as CoreEntity);

  beforeEach(() => {});

  describe('valid Core actions', () => {
    it('loadCoreSuccess should return set the list of known Core', () => {
      const core = [
        createCoreEntity('PRODUCT-AAA'),
        createCoreEntity('PRODUCT-zzz')
      ];
      const action = CoreActions.loadCoreSuccess({ core });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
