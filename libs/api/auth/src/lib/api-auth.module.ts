import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from './api-auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthSignInByFacebookUseCase, AuthMeGetUseCase, AuthSignUpByFacebookUseCase } from './usecases';
import { ApiFacebookModule } from '@slackmap/api/facebook';
import { JwtAuthGuard } from './guards';
import { ApiCommonModule } from '@slackmap/api/common';
import { ApiDbModule } from '@slackmap/api/db';

@Module({
  imports: [
    ApiDbModule,
    ApiCommonModule,
    ApiFacebookModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ApiAuthModule],
      useFactory: (config: AuthConfig) => {
        return {
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '60000000s' },
        };
      },
      inject: [AuthConfig],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthConfig,
    JwtStrategy,
    JwtAuthGuard,
    AuthSignInByFacebookUseCase,
    AuthMeGetUseCase,
    AuthSignUpByFacebookUseCase
  ],
  controllers: [AuthController],
  exports: [AuthConfig],
})
export class ApiAuthModule { }
