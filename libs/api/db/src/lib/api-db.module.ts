import { Module } from '@nestjs/common';
import { DrivineModule, DrivineModuleOptions, DatabaseRegistry, InjectPersistenceManager, PersistenceManager } from '@liberation-data/drivine';

class Fix {
  constructor(
    @InjectPersistenceManager()
    private persistenceManager: PersistenceManager,
  ) {}
}

@Module({
  imports:[
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
    })
  ]
})
export class ApiDbModule {}
