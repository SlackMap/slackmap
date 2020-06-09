import { Injectable } from '@nestjs/common';
import { UserRepository } from '@slackmap/api/auth/data';
import { JwtPayloadModel } from '@slackmap/api/auth/dto';

/**
 * Returns all info required for frontend about current user
 */
@Injectable()
export class AuthMeGetUseCase {

  constructor(
    private userRepository: UserRepository
  ) {}

  async process(payload: JwtPayloadModel): Promise<any> {

    // return this.userRepository.findOne('3434')
    return {
      ...payload
    };
  }
}
