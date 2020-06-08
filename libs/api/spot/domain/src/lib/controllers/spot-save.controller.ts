import { Controller, Post, Body } from '@nestjs/common';
import { Transactional } from '@liberation-data/drivine';
import { SPOT_PATHS, SpotSaveRequestDto, SpotSaveDto } from '@slackmap/api/spot/dto';
import { SpotRepository } from '@slackmap/api/spot/data';

@Controller()
export class SpotSaveController {

  constructor(
    private spotRepository: SpotRepository,
  ) {}

  @Post(SPOT_PATHS.save())
  @Transactional()
  async process(@Body() data: SpotSaveRequestDto): Promise<SpotSaveDto> {

    const spot = await this.spotRepository.create(data.spot)

    return {spot}
  }
}
