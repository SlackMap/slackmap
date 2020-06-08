import { Module } from '@nestjs/common';
import { ClustersController } from './controllers/clusters.controller';
import { ClustersService } from './services';
import { ApiSpotDataModule } from '@slackmap/api/spot/data';

@Module({
  imports: [ApiSpotDataModule],
  controllers: [ClustersController],
  providers: [ClustersService],
  exports: []
})
export class ApiClustersModule {}
