import { Module, HttpModule } from '@nestjs/common';
import { FacebookClient } from './facebook.client';

@Module({
  imports: [HttpModule],
  providers: [FacebookClient],
  exports: [FacebookClient],
})
export class ApiFacebookClientModule {}
