import { createAction, props } from '@ngrx/store';
import { AuthConnectFacebookDto, AuthRegisterByFacebookRequestDto } from '@slackmap/api-client';

export const fbLogin = createAction(
  '[Auth] Fb Login',
);

export const fbLoginSuccess = createAction(
  '[Auth] Fb Login Success',
  props<{ accessToken: string }>()
);

export const fbLoginFailure = createAction(
  '[Auth] Fb Login Failure',
  props<{ error: any }>()
);

export const signInByFacebookSuccess = createAction(
  '[Auth] Sign In By Facebook Success',
  props<AuthConnectFacebookDto>()
);

export const signInByFacebookFailure = createAction(
  '[Auth] Sign In By Facebook Failure',
  props<{ error: any }>()
);

/**
 * Sign Up By Facebook
 */
export const signUpByFacebookRequired = createAction(
  '[Auth] Sign Up By Facebook Required',
  props<AuthConnectFacebookDto>()
);

export const signUpByFacebook = createAction(
  '[Auth] Sign Up By Facebook',
  props<AuthRegisterByFacebookRequestDto>()
);

export const signUpByFacebookCancel = createAction(
  '[Auth] Sign Up By Facebook Cancel',
);
