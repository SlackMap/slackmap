import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { ClusterService } from './cluster.service';
import { OrientModule } from '@slackmap/api/orient';
import { ClusterOptions } from './cluster-options';

const providers = [SpotService, ClusterService, ClusterOptions];

@Module({
  imports: [OrientModule],
  providers,
  exports: providers
})
export class ServicesModule {}
