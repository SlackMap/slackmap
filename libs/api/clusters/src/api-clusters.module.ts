import { Module } from '@nestjs/common';
import { ClustersController } from './controllers/clusters.controller';
import { ClustersService, SpotsService } from './services';
import { OrientModule } from '../../orient/src';
import { ClusterOptions } from './models';

@Module({
  imports: [OrientModule],
  controllers: [ClustersController],
  providers: [ClustersService, SpotsService, ClusterOptions],
  exports: []
})
export class ApiClustersModule {}
