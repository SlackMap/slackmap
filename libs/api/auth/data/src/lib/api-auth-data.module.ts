import { Module } from '@nestjs/common';
import { RidGenerator } from '@slackmap/core';
import { ApiDbModule } from '@slackmap/api/db';
import { UserRepository } from './user.repository';
@Module({
  imports: [
    ApiDbModule,
  ],
  providers: [
    RidGenerator,
    UserRepository,
  ],
  exports: [
    UserRepository,
  ],
})
export class ApiAuthDataModule {}
