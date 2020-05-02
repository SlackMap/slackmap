import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';
import { CloseInterceptor } from './close.interceptor';
import { UserRepository } from './user';

@Module({
  providers: [
    OrientService,
    OrientConfig,
    {
      provide: APP_INTERCEPTOR,
      useClass: CloseInterceptor
    },
    UserRepository,
  ],
  exports: [
    OrientService,
    UserRepository,
  ],
})
export class OrientModule {}
