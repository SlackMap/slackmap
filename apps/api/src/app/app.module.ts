import { Module } from '@nestjs/common';
import { ControllersModule } from '@slackmap/api/core';

@Module({
  imports: [ControllersModule]
})
export class AppModule {}
