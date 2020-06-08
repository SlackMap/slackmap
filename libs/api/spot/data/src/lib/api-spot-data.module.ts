import { Module } from '@nestjs/common';
import { SpotRepository } from './spot.repository';
// import { SpotRepository } from './spot';
@Module({
  controllers: [],
  providers: [
    SpotRepository
  ],
  exports: [
    SpotRepository
  ],
})
export class ApiSpotDataModule {}
