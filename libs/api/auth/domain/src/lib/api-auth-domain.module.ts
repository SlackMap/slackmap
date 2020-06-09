import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ApiAuthDomainConfig } from './api-auth-domain.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthSignInByFacebookUseCase, AuthMeGetUseCase, AuthSignUpByFacebookUseCase } from './usecases';
import { ApiFacebookModule } from '@slackmap/api/facebook';
import { JwtAuthGuard } from './guards';
import { ApiCommonModule } from '@slackmap/api/common';
import { ApiDbModule } from '@slackmap/api/db';
import { AuthService } from './services';
import { ApiAuthDataModule } from '@slackmap/api/auth/data';

@Module({
  imports: [
    ApiAuthDataModule,
    ApiDbModule,
    ApiCommonModule,
    ApiFacebookModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ApiAuthDomainModule],
      useFactory: (config: ApiAuthDomainConfig) => {
        return {
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '60000000s' },
        };
      },
      inject: [ApiAuthDomainConfig],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    ApiAuthDomainConfig,
    JwtStrategy,
    JwtAuthGuard,
    AuthSignInByFacebookUseCase,
    AuthMeGetUseCase,
    AuthSignUpByFacebookUseCase
  ],
  controllers: [AuthController],
  exports: [ApiAuthDomainConfig],
})
export class ApiAuthDomainModule { }
