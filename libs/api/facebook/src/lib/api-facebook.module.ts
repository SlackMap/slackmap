import { Module, HttpModule } from '@nestjs/common';
import { FacebookClient } from './facebook.client';
import { FacebookConfig } from './facebook.config';

@Module({
  imports: [HttpModule],
  providers: [FacebookClient, FacebookConfig],
  exports: [FacebookClient, FacebookConfig],
})
export class ApiFacebookModule {}
