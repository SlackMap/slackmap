import { AuthEntity } from './auth.models';
import { AuthState, initialState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuthId = (it) => it['id'];
  const createAuthEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuthEntity);

  let state;

  beforeEach(() => {
    // state = {
    //   auth: authAdapter.addAll(
    //     [
    //       createAuthEntity('PRODUCT-AAA'),
    //       createAuthEntity('PRODUCT-BBB'),
    //       createAuthEntity('PRODUCT-CCC'),
    //     ],
    //     {
    //       ...initialState,
    //       selectedId: 'PRODUCT-BBB',
    //       error: ERROR_MSG,
    //       loaded: true,
    //     }
    //   ),
    // };
  });

});
