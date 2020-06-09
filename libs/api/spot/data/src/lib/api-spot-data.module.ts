import { Module } from '@nestjs/common';
import { SpotRepository } from './spot.repository';
import { ApiDbModule } from '@slackmap/api/db';

@Module({
  imports: [
    ApiDbModule,
  ],
  providers: [
    SpotRepository
  ],
  exports: [
    SpotRepository
  ],
})
export class ApiSpotDataModule {}
