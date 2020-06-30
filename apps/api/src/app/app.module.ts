import { Module } from '@nestjs/common';
import { ApiClustersModule } from '@slackmap/api/clusters';
import { ApiAuthDomainModule } from '@slackmap/api/auth/domain';
import { ApiConfigModule } from '@slackmap/api/config';
import { ApiSpotDomainModule } from '@slackmap/api/spot/domain';
import { ApiLoggerDataModule } from '@slackmap/api/logger/data';

@Module({
  imports: [
    ApiLoggerDataModule,
    ApiConfigModule,
    ApiAuthDomainModule,
    ApiSpotDomainModule,
    ApiClustersModule,
  ],
})
export class AppModule {}
