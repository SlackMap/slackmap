import { UserModel } from '../models';
import { FacebookUserModel } from '@slackmap/api/facebook/dto';

export const AUTH_PATHS = {
  connectFacebook: () => 'auth/connect-facebook',
}

export class AuthConnectFacebookRequestDto {
  accessToken: string;
  signedRequest?: string;
}

export class AuthConnectFacebookDto {
  facebookProfile: FacebookUserModel;
  users: UserModel[];
}
