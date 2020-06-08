import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { ApiExceptionFilter } from './filters';
import { Syslog } from './lib/syslog';

@Module({
  controllers: [],
  providers: [
    AppConfig,
    ApiExceptionFilter,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    Syslog,
  ],
  exports: [
    AppConfig,
    Syslog,
  ]
})
export class ApiCommonModule {}
