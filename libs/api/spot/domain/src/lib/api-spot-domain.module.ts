import { Module } from '@nestjs/common';
import { SpotSaveController } from './controllers/spot-save.controller';
import { ApiSpotDataModule } from '@slackmap/api/spot/data';
import { ApiClustersModule } from '@slackmap/api/clusters';
import { SpotGetController } from './controllers/spot-get.controller';

@Module({
  imports: [
    ApiSpotDataModule,
    ApiClustersModule,
  ],
  controllers: [SpotSaveController, SpotGetController],
})
export class ApiSpotDomainModule {}
