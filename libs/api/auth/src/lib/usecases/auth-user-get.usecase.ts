import { Injectable } from '@nestjs/common';
import { ValidationError, FacebookGateway, UserService } from 'data';
import { UserEntity, FacebookProfileEntity } from 'data';
import { AuthConnectFacebookRequestDto, AuthUserGetResponseDto, AuthUserGetRequestDto } from '../../dto';

/**
 * Returns user data by it's api_token
 * used to load user session on app startup
 */
@Injectable()
export class AuthUserGetUseCase {
  constructor(private userService: UserService) { }
  async process(req: AuthUserGetRequestDto): Promise<AuthUserGetResponseDto> {
    const payload = await this.userService.tokenVerify(req.api_token);

    // profile id is required
    if (!payload || !payload.user || !payload.user.id) {
      throw new ValidationError({ title: `Your api_token is invalid, try to login again` });
    }

    /**
     * find user in database by facebook_id or email
     */
    const user: UserEntity = await this.userService.get(payload.user.id);

    return {
      api_token: req.api_token,
      user,
      users: [user]
    };
  }
}
