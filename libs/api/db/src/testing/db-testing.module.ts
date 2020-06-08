import { Module } from '@nestjs/common';
import { UserFixture } from './fixtures/user.fixture';
import { RidGenerator } from '@slackmap/core';
import { ApiDbModule } from '../lib/api-db.module';
import { SpotFixture } from './fixtures';

@Module({
  imports: [ApiDbModule],
  providers: [
    UserFixture,
    RidGenerator,
    SpotFixture,
  ],
  exports: [
    UserFixture
  ],
})
export class DbTestingModule { }
