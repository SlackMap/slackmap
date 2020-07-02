import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpotRepository } from '@slackmap/api/spot/data';
import { SPOT_PATHS, SpotGetDto } from '@slackmap/api/spot/dto';
import { Transactional } from '@liberation-data/drivine';

@Controller()
export class SpotGetController {

  constructor(
    private spotRepository: SpotRepository,
  ) {}

  @Get(SPOT_PATHS.get())
  @UsePipes(ValidationPipe)
  @Transactional()
  async process(@Param('rid') rid: string): Promise<SpotGetDto> {

    const spot = await this.spotRepository.findOne({rid})
    return {spot}
  }
}
