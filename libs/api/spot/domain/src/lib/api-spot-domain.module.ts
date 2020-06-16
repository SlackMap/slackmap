import { Module } from '@nestjs/common';
import { SpotSaveController } from './controllers/spot-save.controller';
import { ApiSpotDataModule } from '@slackmap/api/spot/data';
import { ApiClustersModule } from '@slackmap/api/clusters';

@Module({
  imports: [
    ApiSpotDataModule,
    ApiClustersModule,
  ],
  controllers: [SpotSaveController],
})
export class ApiSpotDomainModule {}
