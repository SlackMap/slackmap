import { Controller, Query, Get } from '@nestjs/common';
import {
  SpotPaths,
  SpotClustersGetRequestDto,
  SpotClustersGetResponseDto,
  SpotSpotsGetRequestDto,
  SpotSpotsGetResponseDto,
} from '@slackmap/core';
import { SpotService, ClusterService } from '../services';
import { ValidationError } from '../../lib/errors';
/**
 * query map clusters
 */
@Controller()
export class SpotController {
  constructor(
    private spotService: SpotService,
    private clusterService: ClusterService,
  ) {}

  /**
   * query cluster by bbox
   */
  @Get(SpotPaths.CLUSTERS)
  async clustersGet(
    @Query() request: SpotClustersGetRequestDto,
  ): Promise<SpotClustersGetResponseDto> {
    if (!request.bbox) {
      throw new ValidationError({ title: 'bbox query param is required' });
    }
    const bbox = request.bbox.split(',');
    const clusters = await this.clusterService.query(bbox, request.zoom).catch((err) => {
      console.error('SpotController.clustersGet()', 'zoom', request.zoom, 'bbox', request.bbox, err);
      return [];
    });

    return {
      clusters
    };
  }

  // /**
  //  * Get spots for map by geohash
  //  */
  // @Get(SpotPaths.SPOTS)
  // async clustersSpotsGet(
  //   @Query() request: SpotSpotsGetRequestDto,
  // ): Promise<SpotSpotsGetResponseDto> {
  //   return this.spotService.getByHash(request);
  // }
}
