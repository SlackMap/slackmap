import { Injectable } from '@nestjs/common';
import { JwtPayloadModel } from '../models';
import { AuthMeGetDto } from '../dto';
import { UserRepository } from '@slackmap/api/db';

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
