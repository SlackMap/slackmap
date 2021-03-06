import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { UserRepository } from './user';
import { RidGenerator } from '@slackmap/core';


@Module({
  imports:[
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
  }),
  ],
  controllers: [],
  providers: [
    RidGenerator,
    UserRepository,
  ],
  exports: [
    UserRepository,
  ],
})
export class ApiDbModule {}
