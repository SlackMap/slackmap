import { Module } from '@nestjs/common';
import { SpotSaveController } from './controllers/spot-save.controller';
import { ApiSpotDataModule } from '@slackmap/api/spot/data';

@Module({
  imports: [ApiSpotDataModule],
  controllers: [SpotSaveController],
})
export class ApiSpotDomainModule {}
