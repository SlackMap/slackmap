import { Injectable } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthRegisterByFacebookRequestDto, AuthRegisterByFacebookDto } from '../dto';
import { AuthService } from '../services';
import { JwtPayloadModel, UserModel } from '../models';
import { ValidationError, Syslog } from '@slackmap/api/common';
import { UserRepository, UserService, UserEntity } from '@slackmap/api/orient';

/**
 *
 */
@Injectable()
export class AuthRegisterByFacebookUseCase {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
    private userService: UserService,
  ) { }
  async process(request: AuthRegisterByFacebookRequestDto): Promise<AuthRegisterByFacebookDto> {
    
    // TODO get and merge data from the form from the reuest DTO

    /**
     * This token comes from connect-facebook-usecase, and contains only facbookUser property
     * lets take the data we need
     */
    const { facebookUser } = this.authService.verify(request.token);

    // no possibility to login with no fb id
    if (!facebookUser.id) {
      // ctx.log.debug({status: 422, fb_id: profile.id, fb_name: profile.name}, 'no fb id');
      throw new ValidationError({
        title: `We can't get id of your facebook profile :(`
      });
    }
    let email = facebookUser.email;
    // if permissions was not granted, email is empty, lets use fake one
    // TODO change db schema and remove email as required field in User class
    // TODO if no email from facebook, ask for it during registration and sand verification email
    if (!email) {
      // quick fix to allow no email logins, later we will fix this by authenticating the emails
      email = 'fb-' + facebookUser.id + '@slackmap.com';
      // ctx.log.debug({status: 422, fb_id: profile.id, fb_name: profile.name}, 'no fb email');

      // no possibility to login with no emails
      // throw new ValidationError('20160229090722', `We can't get email from your facebook profile :(`, {rerequest: true});
    }

    /**
     * find user in database by facebook_id
     */
    let user = await this.userRepository.findOne({ 'facebook_id': facebookUser.id });

    /**
     * if no user by fb id,
     * find it by email
     */
    if (!user) {

      user = await this.userRepository.findOne({ email: email });

      /**
       * and connect with fb id
       */
      if (user) {
        user = await this.userService.update(user.rid, { facebookId: facebookUser.id });
      }
    }

    /**
     * if no user
     * create new one
     */
    if (!user) {
      const userData: Partial<UserEntity> = {
        name: facebookUser.name || '',
        firstName: facebookUser.first_name || '',
        lastName: facebookUser.last_name || '',
        email: email,
        facebookId: facebookUser.id
      };
      user = await this.userService.create(userData);
    }

    // // set default location
    // try {
    //   await this.setLocation(user.rid, ItemRids.WORLD)
    // } catch (err) {
    //   console.error('set location error: 20170309215943', err);
    // }

    // // create post on user wall
    // try {
    //   // await this.postService.upsertPostOnUser(PostSubtype.USER, user, user)
    // } catch (err) {
    //   console.error('create user post on registration: 20170310201036', err);
    // }
    /**
     * login the user and create it's session
     */
    // await ctx.login(user);

    /**
     * update login stamp
     */
    // this.userService.logLoginAction(user);

    // return userEntity2model<UserModel>(user);

    const apiToken = this.authService.sign({
      facebookUser,
      user,
      users: [user]
    });
    return {
      apiToken,
      user,
      users: [user]
    };
  }
}
