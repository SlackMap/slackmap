import { UserAction, UserActionTypes } from './user.actions';

export const USER_FEATURE_KEY = 'user';

/**
 * Interface for the 'User' data used in
 *  - UserState, and
 *  - userReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface UserState {
  list: Entity[]; // list of User; analogous to a sql normalized table
  selectedId?: string | number; // which User record has been selected
  loaded: boolean; // has the User list been loaded
  error?: any; // last none error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const userInitialState: UserState = {
  list: [],
  loaded: false,
};

export function userReducer(
  state: UserState = userInitialState,
  action: UserAction,
): UserState {
  switch (action.type) {
    case UserActionTypes.UserLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true,
      };
      break;
    }
  }
  return state;
}
