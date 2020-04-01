import { MapEntity } from './map.models';
import { State, mapAdapter, initialState } from './map.reducer';
import * as MapSelectors from './map.selectors';

describe('Map Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMapId = it => it['id'];
  const createMapEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MapEntity);

  let state;

  beforeEach(() => {
    state = {
      map: mapAdapter.addAll(
        [
          createMapEntity('PRODUCT-AAA'),
          createMapEntity('PRODUCT-BBB'),
          createMapEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Map Selectors', () => {
    it('getAllMap() should return the list of Map', () => {
      const results = MapSelectors.getAllMap(state);
      const selId = getMapId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MapSelectors.getSelected(state);
      const selId = getMapId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMapLoaded() should return the current 'loaded' status", () => {
      const result = MapSelectors.getMapLoaded(state);

      expect(result).toBe(true);
    });

    it("getMapError() should return the current 'error' state", () => {
      const result = MapSelectors.getMapError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
