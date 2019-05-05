import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { ClusterService } from './cluster.service';

@Module({
  providers: [SpotService, ClusterService]
})
export class ServicesModule {}
