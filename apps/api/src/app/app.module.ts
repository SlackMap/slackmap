import { Module } from '@nestjs/common';
import { OrientModule } from '@slackmap/api/orient';
import { ApiClustersModule } from '@slackmap/api/clusters';
import { ApiAuthModule } from '@slackmap/api/auth';
import { ApiConfigModule } from '@slackmap/api/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    OrientModule,
    ApiClustersModule,
    ApiAuthModule,
    ApiConfigModule,
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
