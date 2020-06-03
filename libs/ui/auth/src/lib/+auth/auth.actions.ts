import { createAction, props } from '@ngrx/store';
import { AuthSignInByFacebookDto, AuthSignUpByFacebookRequestDto, AuthSignUpByFacebookDto } from '@slackmap/api/auth/dto';

export const fetchUser = createAction(
  '[Auth] Fetch User',
);

export const signIn = createAction(
  '[Auth] Sign In',
);

export const signOut = createAction(
  '[Auth] Sign Out',
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
);

export const signInCancel = createAction(
  '[Auth] Sign In Cancel',
);

export const signInByFacebook = createAction(
  '[Auth] Sign In By Facebook',
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
  props<{payload: AuthSignInByFacebookDto}>()
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
  props<AuthSignInByFacebookDto>()
);

export const signUpByFacebook = createAction(
  '[Auth] Sign Up By Facebook',
  props<{payload: AuthSignUpByFacebookRequestDto}>()
);

export const signUpByFacebookCancel = createAction(
  '[Auth] Sign Up By Facebook Cancel',
);

export const signUpByFacebookSuccess = createAction(
  '[Auth] Sign Up By Facebook Success',
  props<{payload: AuthSignUpByFacebookDto}>()
);

export const signUpByFacebookFailure = createAction(
  '[Auth] Sign Up By Facebook Failure',
  props<{error: any}>()
);
