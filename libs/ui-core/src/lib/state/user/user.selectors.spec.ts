import { Entity, UserState } from './user.reducer';
import { userQuery } from './user.selectors';

describe('User Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUserId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createUser = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`,
    });
    storeState = {
      user: {
        list: [
          createUser('PRODUCT-AAA'),
          createUser('PRODUCT-BBB'),
          createUser('PRODUCT-CCC'),
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      },
    };
  });

  describe('User Selectors', () => {
    it('getAllUser() should return the list of User', () => {
      const results = userQuery.getAllUser(storeState);
      const selId = getUserId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedUser() should return the selected Entity', () => {
      const result = userQuery.getSelectedUser(storeState);
      const selId = getUserId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = userQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = userQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
