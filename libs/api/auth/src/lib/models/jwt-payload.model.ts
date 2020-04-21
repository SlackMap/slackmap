import { FacebookUserModel } from '@slackmap/api/facebook/dto';
import { UserModel } from './user.model';

export class JwtPayloadModel {
  facebookUser?: FacebookUserModel;
  user: UserModel;
  users: UserModel[];
}
