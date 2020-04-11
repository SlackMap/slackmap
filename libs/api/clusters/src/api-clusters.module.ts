import { Module } from '@nestjs/common';
import { ClustersController } from './controllers/clusters.controller';
import { ClustersService, SpotsService } from './services';
import { OrientModule } from '../../orient/src';

@Module({
  imports: [OrientModule],
  controllers: [ClustersController],
  providers: [ClustersService, SpotsService],
  exports: []
})
export class ApiClustersModule {}
