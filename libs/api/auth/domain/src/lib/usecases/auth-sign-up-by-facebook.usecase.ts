import { Injectable } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthSignUpByFacebookRequestDto, AuthSignUpByFacebookDto, JwtPayloadModel, UserModel } from '@slackmap/api/auth/dto';
import { ValidationError, Syslog } from '@slackmap/api/common';
import { UserRepository, UserEntity } from '@slackmap/api/auth/data';
import { AuthService } from '../services';

/**
 *
 */
@Injectable()
export class AuthSignUpByFacebookUseCase {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
    // private userService: UserService
  ) { }
  async process(request: AuthSignUpByFacebookRequestDto): Promise<AuthSignUpByFacebookDto> {

    // TODO get and merge data from the form from the reuest DTO

    /**
     * This token comes from connect-facebook-usecase, and contains only facbookUser property
     * lets take the data we need
     */
    const { facebookUser } = this.authService.verify(request.apiToken);

    // no possibility to login with no fb id
    if (!facebookUser.id) {
      // ctx.log.debug({status: 422, fb_id: profile.id, fb_name: profile.name}, 'no fb id');
      throw new ValidationError({
        title: `We can't get id of your facebook profile :(`
      });
    }
    let email = facebookUser.email;
    // if permissions was not granted, email is empty, get it from the registration form
    if (!email) {
      email = request.email;
      // TODO send verification email
    }

    /**
     * find user in database by facebook_id
     */
    let user = await this.userRepository.findOne({facebookId: facebookUser.id});

    /**
     * if no user by fb id,
     * find it by email
     */
    if (!user) {

        user = await this.userRepository.findOne({email});

      /**
       * and connect with fb id
       */
      if (user) {
        user = await this.userRepository.update(user.rid, { facebookId: facebookUser.id });
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
      user = await this.userRepository.create(userData);
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
      users: []
    });
    return {
      apiToken,
      user,
      users: []
    };
  }
}
