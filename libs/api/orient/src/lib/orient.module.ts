import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RidGenerator } from '@slackmap/core';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';
import { CloseInterceptor } from './close.interceptor';
import { UserRepository, UserService } from './user';

@Module({
  providers: [
    OrientService,
    OrientConfig,
    {
      provide: APP_INTERCEPTOR,
      useClass: CloseInterceptor
    },
    UserRepository,
    RidGenerator,
    UserService,
    // {
    //   provide: RidGenerator,
    //   useClass: RidGenerator
    // }
  ],
  exports: [
    OrientService,
    UserRepository,
    UserService,
  ],
})
export class OrientModule {}
