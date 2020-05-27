import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserModel, FacebookUserModel } from '@slackmap/api-client';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  apiToken: string;
  user: UserModel;
  users: UserModel[];
  signUpByFacebook: {
    apiToken: string;
    facebookUser: FacebookUserModel
  }
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  apiToken: null,
  user: null,
  users: [],
  signUpByFacebook: null
};
initialState.signUpByFacebook = {"facebookUser":{"id":"1278937090","email":"pedro.blaszczak@gmail.com","first_name":"Piotr","last_name":"Błaszczak","picture":{"data":{"height":50,"is_silhouette":false,"url":"https://scontent-waw1-1.xx.fbcdn.net/v/t31.0-1/cp0/c118.350.1180.1180a/s50x50/341001_4598135112934_1548172265_o.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=Z3ZyN-DAzB0AX_hLsEe&_nc_ht=scontent-waw1-1.xx&oh=ef744898b064a9ff8ccfcbf979a47d13&oe=5EEE63F9","width":50}},"name":"Piotr Błaszczak"},"apiToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va1VzZXIiOnsiaWQiOiIxMjc4OTM3MDkwIiwiZW1haWwiOiJwZWRyby5ibGFzemN6YWtAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IlBpb3RyIiwibGFzdF9uYW1lIjoiQsWCYXN6Y3phayIsInBpY3R1cmUiOnsiZGF0YSI6eyJoZWlnaHQiOjUwLCJpc19zaWxob3VldHRlIjpmYWxzZSwidXJsIjoiaHR0cHM6Ly9zY29udGVudC13YXcxLTEueHguZmJjZG4ubmV0L3YvdDMxLjAtMS9jcDAvYzExOC4zNTAuMTE4MC4xMTgwYS9zNTB4NTAvMzQxMDAxXzQ1OTgxMzUxMTI5MzRfMTU0ODE3MjI2NV9vLmpwZz9fbmNfY2F0PTEwMiZfbmNfc2lkPWRiYjllNyZfbmNfb2hjPVozWnlOLURBekIwQVhfaExzRWUmX25jX2h0PXNjb250ZW50LXdhdzEtMS54eCZvaD1lZjc0NDg5OGIwNjRhOWZmOGNjZmNiZjk3OWE0N2QxMyZvZT01RUVFNjNGOSIsIndpZHRoIjo1MH19LCJuYW1lIjoiUGlvdHIgQsWCYXN6Y3phayJ9LCJ1c2VyIjpudWxsLCJ1c2VycyI6W10sImlhdCI6MTU5MDIxNDM3NCwiZXhwIjoxNjUwMjE0Mzc0fQ.Ulohwpmcr-wwovRQMLQOHLry5QN_MJgkO6sTTtW5XO8"};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signInByFacebookSuccess, (state, {payload}) => ({ ...state, ...payload, signUpByFacebook: null })),
  on(AuthActions.signUpByFacebookRequired, (state, signUpByFacebook) => ({ ...state, signUpByFacebook })),
  on(AuthActions.signUpByFacebookCancel, (state) => ({ ...state, signUpByFacebook: null })),
  on(AuthActions.signUpByFacebookSuccess, (state, {payload}) => ({ ...state, ...payload, signUpByFacebook: null })),
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
