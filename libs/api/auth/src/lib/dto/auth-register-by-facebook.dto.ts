import { Gender } from "@slackmap/core";
import { FacebookUserModel } from '@slackmap/api/facebook/dto';
import { UserModel } from '../models';

export class AuthRegisterByFacebookRequestDto {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
export class AuthRegisterByFacebookDto {
  facebookUser?: FacebookUserModel;
  apiToken: string;
  user: UserModel;
  users: UserModel[];
}
