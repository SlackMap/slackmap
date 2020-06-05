import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUTH_FEATURE_KEY,
  AuthState,
  AuthPartialState,
} from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthPartialState, AuthState>(
  AUTH_FEATURE_KEY
);

export const getSignUpByFacebook = createSelector(
  getAuthState,
  state => state.signUpByFacebook
)
export const getUser = createSelector(
  getAuthState,
  state => state.user
)
export const getSettings = createSelector(
  getAuthState,
  state => state.settings
)
