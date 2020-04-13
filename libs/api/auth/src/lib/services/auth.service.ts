import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadModel } from '@slackmap/api-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  sign(payload: TokenPayloadModel): string {
    return this.jwtService.sign(payload)
  }

  verify(token: string): TokenPayloadModel {
    return this.jwtService.verify(token, {})
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.userService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }

  // async login(user: User) {
  //   const payload = { username: user.email, sub: user.id };
  //   return {
  //     user,
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
