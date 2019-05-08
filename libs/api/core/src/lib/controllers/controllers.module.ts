import { Module } from '@nestjs/common';
import { SpotController } from './spot.controller';
import { ServicesModule } from '../services';

@Module({
  imports: [ServicesModule],
  controllers: [SpotController]
})
export class ControllersModule {}
