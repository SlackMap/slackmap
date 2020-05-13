import { Module } from '@nestjs/common';
import { ClustersController } from './controllers/clusters.controller';
import { ClustersService } from './services';
import { ApiDbModule } from '@slackmap/api/db';

@Module({
  imports: [ApiDbModule],
  controllers: [ClustersController],
  providers: [ClustersService],
  exports: []
})
export class ApiClustersModule {}
