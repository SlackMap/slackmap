import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { Env } from '@slackmap/api/common';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: process.env.NODE_ENV,
        level: process.env.NODE_ENV === Env.DEV ? 'debug' : 'info',
        prettyPrint: process.env.NODE_ENV === Env.DEV,
      },
    })
  ],
  exports: [
    LoggerModule
  ],
})
export class ApiLoggerDataModule {}
