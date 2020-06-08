import { Module } from '@nestjs/common';
import { UserFixture } from './fixtures';
import { RidGenerator } from '@slackmap/core';
import { ApiDbModule } from '../lib/api-db.module';

@Module({
  imports: [ApiDbModule],
  providers: [
    UserFixture,
    RidGenerator,
  ],
  exports: [
    UserFixture
  ],
})
export class DbTestingModule { }
