import { Controller, Post, UseGuards, Get, Body, Injectable, Scope, Inject } from '@nestjs/common';
import { AUTH_PATHS, AuthSignInByFacebookRequestDto, AuthSignInByFacebookDto, AuthSignUpByFacebookRequestDto, AuthSignUpByFacebookDto } from '../dto';
import { AuthSignInByFacebookUseCase, AuthMeGetUseCase, AuthSignUpByFacebookUseCase } from '../usecases';
import { Observable } from 'rxjs';
import { JwtPayload } from '../decorators';
import { JwtPayloadModel } from '../models';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { ModuleRef } from '@nestjs/core';

@Controller()
export class AuthController {
  constructor(
    private module: ModuleRef,
    private readonly connectFacebookUseCase: AuthSignInByFacebookUseCase,
    private readonly meGetUseCase: AuthMeGetUseCase,
  ) { }

  /**
   * Login to SlackMap with Facebook accessToken
   */
  @Post(AUTH_PATHS.signInByFacebook())
  public signIntByFacebook(@Body() data: AuthSignInByFacebookRequestDto): Observable<AuthSignInByFacebookDto> {
    return this.connectFacebookUseCase.process(data);
  }

  /**
   * Register by facebook
   */
  @Post(AUTH_PATHS.signUpByFacebook())
  signUpByFacebook(@Body() data: AuthSignUpByFacebookRequestDto): Promise<AuthSignUpByFacebookDto> {
    const usecase = this.module.get(AuthSignUpByFacebookUseCase);
    return usecase.process(data);
  }

  /**
   * Get current profile
   */
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
