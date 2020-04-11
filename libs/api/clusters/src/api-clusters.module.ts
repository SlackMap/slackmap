import { Module } from '@nestjs/common';
import { ClustersController } from './controllers/clusters.controller';
import { ClustersService, SpotsService } from './services';
import { OrientModule } from '../../orient/src';
import { SuperclusterOptions } from './models';

@Module({
  imports: [OrientModule],
  controllers: [ClustersController],
  providers: [ClustersService, SpotsService, SuperclusterOptions],
  exports: []
})
export class ApiClustersModule {}
