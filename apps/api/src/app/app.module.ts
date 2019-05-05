import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from '@slackmap/api/core';

@Module({
  imports: [ControllersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
