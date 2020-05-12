import { Controller, Post, UseGuards, Get, Body, Injectable, Scope, Inject } from '@nestjs/common';
import { AUTH_PATHS, AuthConnectFacebookRequestDto, AuthConnectFacebookDto, AuthRegisterByFacebookRequestDto, AuthRegisterByFacebookDto } from '../dto';
import { AuthConnectFacebookUseCase, AuthMeGetUseCase, AuthRegisterByFacebookUseCase } from '../usecases';
import { Observable } from 'rxjs';
import { JwtPayload } from '../decorators';
import { JwtPayloadModel } from '../models';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { ModuleRef } from '@nestjs/core';

@Controller()
export class AuthController {
  constructor(
    private module: ModuleRef,
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

  /**
   * Register by facebook
   */
  @Post(AUTH_PATHS.registerByFacebook())
  registerByFacebook(@Body() data: AuthRegisterByFacebookRequestDto): Promise<AuthRegisterByFacebookDto> {
    const usecase = this.module.get(AuthRegisterByFacebookUseCase);
    return usecase.process(data);
  }

  /**
   * Get current profile
   */
  // @UseGuards(JwtAuthGuard)
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
