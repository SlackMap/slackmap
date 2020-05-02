import { Injectable } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthRegisterByFacebookRequestDto, AuthRegisterByFacebookDto } from '../dto';
import { UserService, AuthService } from '../services';
import { JwtPayloadModel, UserModel } from '../models';
import { ValidationError, Syslog } from '@slackmap/api/common';
import { userEntity2model, UserRepository } from '@slackmap/api/orient';

/**
 *
 */
@Injectable()
export class AuthRegisterByFacebookUseCase {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) { }
  async process(request: AuthRegisterByFacebookRequestDto): Promise<AuthRegisterByFacebookDto> {
        /**
         * This token comes from connect-facebook-usecase, and contains only facbookUser property
         * lets take the data we need
         */
        let {facebookUser: {id: facebookId, email}} = this.authService.verify(request.token);

        // no possibility to login with no fb id
        if (!facebookId) {
            // ctx.log.debug({status: 422, fb_id: profile.id, fb_name: profile.name}, 'no fb id');
            throw new ValidationError({
              title: `We can't get id of your facebook profile :(`
            });
        }

        // if permissions was not granted, email is empty, lets use fake one
        // TODO change db schema and remove email as required field in User class
        // TODO if no email from facebook, ask for it during registration and sand verification email
        if (!email) {
            // quick fix to allow no email logins, later we will fix this by authenticating the emails
            email = 'fb-'+facebookId+'@slackmap.com';
            // ctx.log.debug({status: 422, fb_id: profile.id, fb_name: profile.name}, 'no fb email');

            // no possibility to login with no emails
            // throw new ValidationError('20160229090722', `We can't get email from your facebook profile :(`, {rerequest: true});
        }

        /**
         * find user in database by facebook_id
         */
        let user = await this.userRepository.findOne({'facebook_id': facebookId});
console.log(user)
        /**
         * if no user by fb id,
         * find it by email
         */
        if (!user) {

            user = await this.userRepository.findOne({email: email});

            /**
             * and connect with fb id
             */
            if (user) {
                // user = await this.userService.update(user.id, {facebook_id: facebookId});
            }
        }

        /**
         * if no user
         * create new one
         */
        // if (!user) {
        //     let userData = fbProfile2UserEntity(profile);
        //     user = await this.userService.create(userData);
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
        return null;
  }
}
