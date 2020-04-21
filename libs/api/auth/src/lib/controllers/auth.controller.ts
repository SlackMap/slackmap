import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AUTH_PATHS, AuthConnectFacebookRequestDto, AuthConnectFacebookDto } from '../dto';
import { AuthConnectFacebookUseCase, AuthMeGetUseCase } from '../usecases';
import { Observable } from 'rxjs';
import { JwtPayload } from '../decorators';
import { JwtPayloadModel } from '../models';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';

@Controller()
export class AuthController {
  constructor(
    private readonly connectFacebookUseCase: AuthConnectFacebookUseCase,
    private readonly meGetUseCase: AuthMeGetUseCase,
  ) { }

  /**
   * Login to SlackMap with Facebook accessToken
   */
  @Post(AUTH_PATHS.connectFacebook())
  public connectFacebook(@Body() data: AuthConnectFacebookRequestDto): Observable<AuthConnectFacebookDto> {
    return this.connectFacebookUseCase.process(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AUTH_PATHS.me())
  me(@JwtPayload() payload: JwtPayloadModel) {
    return this.meGetUseCase.process(payload);
  }

  // TODO implement login by temporary email link & login+password
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
