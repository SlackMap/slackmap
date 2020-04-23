import { UserModel } from '../models';
import { FacebookUserModel } from '@slackmap/api/facebook/dto';

export class AuthConnectFacebookRequestDto {
  accessToken: string;
  signedRequest?: string;
}

export class AuthConnectFacebookDto {
  apiToken: string;
  facebookUser: FacebookUserModel;
  user: UserModel;
  users: UserModel[];
}

export class AuthMeGetDto {
  user: UserModel;
}
