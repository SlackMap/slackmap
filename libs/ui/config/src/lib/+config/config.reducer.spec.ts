import { ConfigEntity } from './config.models';
import * as ConfigActions from './config.actions';
import { State, initialState, reducer } from './config.reducer';

describe('Config Reducer', () => {
  const createConfigEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ConfigEntity);

  beforeEach(() => {});

  describe('valid Config actions', () => {
    it('loadConfigSuccess should return set the list of known Config', () => {
      const config = [
        createConfigEntity('PRODUCT-AAA'),
        createConfigEntity('PRODUCT-zzz'),
      ];
      const action = ConfigActions.loadConfigSuccess({ config });

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
