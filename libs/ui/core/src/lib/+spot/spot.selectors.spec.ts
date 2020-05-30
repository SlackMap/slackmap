import { SpotState, initialState } from './spot.reducer';
import * as SpotsSelectors from './spot.selectors';

describe('Spots Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSpotsId = it => it['id'];
  // const createSpotsEntity = (id: string, name = '') =>
  //   ({
  //     id,
  //     name: name || `name-${id}`
  //   } as SpotsEntity);

  let state;

  beforeEach(() => {
    // state = {
    //   spots: spotsAdapter.addAll(
    //     [
    //       createSpotsEntity('PRODUCT-AAA'),
    //       createSpotsEntity('PRODUCT-BBB'),
    //       createSpotsEntity('PRODUCT-CCC')
    //     ],
    //     {
    //       ...initialState,
    //       selectedId: 'PRODUCT-BBB',
    //       error: ERROR_MSG,
    //       loaded: true
    //     }
    //   )
    // };
  });

  describe('Spots Selectors', () => {
    // it('getAllSpots() should return the list of Spots', () => {
    //   const results = SpotsSelectors.getAllSpots(state);
    //   const selId = getSpotsId(results[1]);

    //   expect(results.length).toBe(3);
    //   expect(selId).toBe('PRODUCT-BBB');
    // });

    // it('getSelected() should return the selected Entity', () => {
    //   const result = SpotsSelectors.getSelected(state);
    //   const selId = getSpotsId(result);

    //   expect(selId).toBe('PRODUCT-BBB');
    // });

    // it("getSpotsLoaded() should return the current 'loaded' status", () => {
    //   const result = SpotsSelectors.getSpotsLoaded(state);

    //   expect(result).toBe(true);
    // });

    // it("getSpotsError() should return the current 'error' state", () => {
    //   const result = SpotsSelectors.getSpotsError(state);

    //   expect(result).toBe(ERROR_MSG);
    // });
  });
});
