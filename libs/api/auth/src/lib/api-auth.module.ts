import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from './api-auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from './services';
import { OrientModule } from '@slackmap/api/orient';
import { AuthConnectFacebookUseCase, AuthMeGetUseCase } from './usecases';
import { ApiFacebookModule } from '@slackmap/api/facebook';
import { JwtAuthGuard } from './guards';
import { ApiCommonModule } from '@slackmap/api/common';

@Module({
  imports: [
    ApiCommonModule,
    OrientModule,
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
    UserService,
    JwtAuthGuard,
    AuthConnectFacebookUseCase,
    AuthMeGetUseCase
  ],
  controllers: [AuthController],
  exports: [AuthConfig],
})
export class ApiAuthModule { }
