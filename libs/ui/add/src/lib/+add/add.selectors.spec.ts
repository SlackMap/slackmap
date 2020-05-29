import { AddEntity } from './add.models';
import { State, addAdapter, initialState } from './add.reducer';
import * as AddSelectors from './add.selectors';

describe('Add Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAddId = (it) => it['id'];
  const createAddEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AddEntity);

  let state;

  beforeEach(() => {
    state = {
      add: addAdapter.addAll(
        [
          createAddEntity('PRODUCT-AAA'),
          createAddEntity('PRODUCT-BBB'),
          createAddEntity('PRODUCT-CCC'),
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

  describe('Add Selectors', () => {
    it('getAllAdd() should return the list of Add', () => {
      const results = AddSelectors.getAllAdd(state);
      const selId = getAddId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AddSelectors.getSelected(state);
      const selId = getAddId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getAddLoaded() should return the current 'loaded' status", () => {
      const result = AddSelectors.getAddLoaded(state);

      expect(result).toBe(true);
    });

    it("getAddError() should return the current 'error' state", () => {
      const result = AddSelectors.getAddError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
