import { FacebookProfileModel, UserModel } from '../models';


export const AUTH_PATHS = {
  connectFacebook: () => 'auth/connect-facebook',
}

export class AuthConnectFacebookRequestDto {
  accessToken: string;
  signedRequest?: string;
}

export class AuthConnectFacebookDto {
  facebookProfile: FacebookProfileModel;
  users: UserModel[];
}
