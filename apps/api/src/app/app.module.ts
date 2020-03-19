import { Module } from '@nestjs/common';
import { OrientModule } from '@slackmap/api/orient';
import { ApiClustersModule } from '@slackmap/api/clusters';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    OrientModule,
    ApiClustersModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
