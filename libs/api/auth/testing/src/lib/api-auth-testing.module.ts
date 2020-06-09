import { Module } from '@nestjs/common';
import { RidGenerator } from '@slackmap/core';
import { UserFixture } from './user.fixture';
import { ApiDbModule } from '@slackmap/api/db';

@Module({
  imports: [
    ApiDbModule,
  ],
  providers: [
    UserFixture,
    RidGenerator,
  ],
  exports: [
    UserFixture,
  ],
})
export class ApiAuthTestingModule {}
