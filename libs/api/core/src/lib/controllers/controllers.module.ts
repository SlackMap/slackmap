import { Module } from '@nestjs/common';
import { SpotController } from './spot.controller';

@Module({
  controllers: [SpotController]
})
export class ControllersModule {}
