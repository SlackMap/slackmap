import { Module } from '@nestjs/common';
import { UserFixture } from './fixtures/user.fixture';
import { OrientModule } from '../lib';
import { RidGenerator } from '@slackmap/core';

@Module({
  imports: [OrientModule],
  providers: [
    UserFixture,
    RidGenerator,
    // {provide: RidGenerator, useClass: RidGenerator},
  ],
  exports: [UserFixture],
})
export class OrientTestingModule { }
