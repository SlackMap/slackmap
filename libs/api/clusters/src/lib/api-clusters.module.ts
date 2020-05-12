import { Module } from '@nestjs/common';
import { ClustersController } from './controllers/clusters.controller';
import { ClustersService, SpotsService } from './services';

@Module({
  imports: [],
  controllers: [ClustersController],
  providers: [ClustersService, SpotsService],
  exports: []
})
export class ApiClustersModule {}
