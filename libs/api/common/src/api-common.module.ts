import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { ApiExceptionFilter } from './filters';

@Module({
  controllers: [],
  providers: [
    AppConfig,
    ApiExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    }
  ],
  exports: [AppConfig]
})
export class ApiCommonModule {}
