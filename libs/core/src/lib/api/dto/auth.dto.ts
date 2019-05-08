import { FacebookProfileModel, UserModel } from '../models';

export class AuthConnectFacebookRequestDto {
  accessToken: string;
  signedRequest?: string;
}

export class AuthConnectFacebookResponseDto {
  facebookProfile: FacebookProfileModel;
  users: UserModel[];
}
