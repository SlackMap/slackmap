import { Gender } from "@slackmap/core";
import { FacebookUserModel } from '@slackmap/api/facebook/dto';
import { UserModel } from '../models';

export class AuthSignUpByFacebookRequestDto {
  apiToken: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
export class AuthSignUpByFacebookDto {
  facebookUser?: FacebookUserModel;
  apiToken: string;
  user: UserModel;
  users: UserModel[];
}
