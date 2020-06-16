import { Controller, Post, Body, ValidationPipe, UsePipes, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { Transactional } from '@liberation-data/drivine';
import { SPOT_PATHS, SpotSaveRequestDto, SpotSaveDto } from '@slackmap/api/spot/dto';
import { SpotRepository } from '@slackmap/api/spot/data';
import { ClustersService } from '@slackmap/api/clusters';

@Controller()
export class SpotSaveController {

  constructor(
    private spotRepository: SpotRepository,
    private clusterService: ClustersService
  ) {}

  @Post(SPOT_PATHS.save())
  @UsePipes(ValidationPipe)
  @Transactional()
  async process(@Body() data: SpotSaveRequestDto): Promise<SpotSaveDto> {

    const spot = await this.spotRepository.create(data.spot)
    this.clusterService.reloadCluster(data.spot.sport);
    return {spot}
  }
}
