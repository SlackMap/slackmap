import { Module } from '@nestjs/common';
import { OrientModule } from '@slackmap/api/orient';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    OrientModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
