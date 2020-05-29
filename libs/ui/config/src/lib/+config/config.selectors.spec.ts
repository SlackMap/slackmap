import { ConfigEntity } from './config.models';
import { State, configAdapter, initialState } from './config.reducer';
import * as ConfigSelectors from './config.selectors';

describe('Config Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getConfigId = (it) => it['id'];
  const createConfigEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ConfigEntity);

  let state;

  beforeEach(() => {
    state = {
      config: configAdapter.addAll(
        [
          createConfigEntity('PRODUCT-AAA'),
          createConfigEntity('PRODUCT-BBB'),
          createConfigEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Config Selectors', () => {
    it('getAllConfig() should return the list of Config', () => {
      const results = ConfigSelectors.getAllConfig(state);
      const selId = getConfigId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ConfigSelectors.getSelected(state);
      const selId = getConfigId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getConfigLoaded() should return the current 'loaded' status", () => {
      const result = ConfigSelectors.getConfigLoaded(state);

      expect(result).toBe(true);
    });

    it("getConfigError() should return the current 'error' state", () => {
      const result = ConfigSelectors.getConfigError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
