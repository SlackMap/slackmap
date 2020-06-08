import { Module } from '@nestjs/common';
import { SpotFixture } from './spot.fixture';
import { ApiDbModule } from '@slackmap/api/db';
import { RidGenerator } from '@slackmap/core';

@Module({
  imports: [ApiDbModule],
  providers: [SpotFixture, RidGenerator],
  exports: [SpotFixture],
})
export class ApiSpotTestingModule {}
