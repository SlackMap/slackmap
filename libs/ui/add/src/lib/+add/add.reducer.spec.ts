import { AddEntity } from './add.models';
import * as AddActions from './add.actions';
import { State, initialState, reducer } from './add.reducer';

describe('Add Reducer', () => {
  const createAddEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AddEntity);

  beforeEach(() => {});

  describe('valid Add actions', () => {
    it('loadAddSuccess should return set the list of known Add', () => {
      const add = [
        createAddEntity('PRODUCT-AAA'),
        createAddEntity('PRODUCT-zzz'),
      ];
      const action = AddActions.loadAddSuccess({ add });

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
