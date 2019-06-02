import { Module } from '@nestjs/common';
import { UhfController } from './uhf.controller';
import { UhfMailRegConfig } from './uhf-mail-reg-config';
import { OrientModule } from '@slackmap/api/orient';

@Module({
  imports: [OrientModule],
  controllers: [UhfController],
  providers: [UhfMailRegConfig]
})
export class UhfModule {}
