import { Module } from '@nestjs/common';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';

@Module({
  providers: [OrientService, OrientConfig],
  exports: [OrientService],
})
export class OrientModule { }
