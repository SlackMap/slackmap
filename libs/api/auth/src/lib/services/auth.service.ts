import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadModel } from '../models';

@Injectable()
export class AuthService {
  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * Signs the payload and returns JWT token
   */
  sign(payload: JwtPayloadModel): string {
    return this.jwtService.sign(payload)
  }

  /**
   * Verifies JWT token and returns payload
   */
  verify(token: string): JwtPayloadModel {
    return this.jwtService.verify(token)
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
