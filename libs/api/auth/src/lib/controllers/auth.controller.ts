import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_PATHS, AuthConnectFacebookRequestDto, AuthConnectFacebookDto } from '../dto';
import { AuthConnectFacebookUseCase } from '../usecases';
import { Observable } from 'rxjs';

@Controller()
export class AuthController {
  constructor(
    private readonly connectFacebookUseCase: AuthConnectFacebookUseCase,
  ) { }

  /**
   * Login to SlackMap with Facebook accessToken
   */
  @Post(AUTH_PATHS.connectFacebook())
  public connectFacebook(@Body() data: AuthConnectFacebookRequestDto): Observable<AuthConnectFacebookDto> {
    return this.connectFacebookUseCase.process(data);
  }


  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return {
  //     user: req.user,
  //     comments: [
  //       { id: 1, text: 'Super artykuł!!!' },
  //       { id: 2, text: 'Super!!!' },
  //       { id: 3, text: 'Super !!!' },
  //     ],
  //   };
  // }
}
