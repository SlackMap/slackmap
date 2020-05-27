import { UserModel } from '../models';
import { FacebookUserModel } from '@slackmap/api/facebook/dto';

export class AuthSignInByFacebookRequestDto {
  accessToken: string;
  signedRequest?: string;
}

export class AuthSignInByFacebookDto {
  apiToken: string;
  facebookUser: FacebookUserModel;
  user: UserModel;
  users: UserModel[];
}

export class AuthMeGetDto {
  facebookUser: FacebookUserModel;
  user: UserModel;
  users: UserModel[];
}
