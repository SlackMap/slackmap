import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';
import { CloseInterceptor } from './close.interceptor';

@Module({
  providers: [
    OrientService,
    OrientConfig,
    {
      provide: APP_INTERCEPTOR,
      useClass: CloseInterceptor
    }
  ],
  exports: [OrientService],
})
export class OrientModule {}
