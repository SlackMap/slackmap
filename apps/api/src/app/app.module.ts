import { Module } from '@nestjs/common';
import { ControllersModule } from '@slackmap/api/core';
import { UhfModule } from './uhf/uhf.module';

@Module({
  imports: [ControllersModule, UhfModule]
})
export class AppModule {}
