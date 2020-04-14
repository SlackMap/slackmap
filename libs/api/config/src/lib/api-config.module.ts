import { Module } from '@nestjs/common';
import { ConfigController } from './controllers/config.controller';
import { ConfigGetUseCase } from './usecases';
import { ApiFacebookModule } from '@slackmap/api/facebook';
import { ApiCommonModule } from '@slackmap/api/common';
import { AppConfig } from './app.config';

@Module({
  imports: [ApiCommonModule, ApiFacebookModule],
  controllers: [ConfigController],
  providers: [ConfigGetUseCase, AppConfig],
  exports: [AppConfig],
})
export class ApiConfigModule {}
