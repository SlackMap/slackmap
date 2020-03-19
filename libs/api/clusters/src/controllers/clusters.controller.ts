import { Controller, Query, Get, ValidationPipe, UsePipes } from '@nestjs/common';
import {
  ClustersPaths,
  ClustersClustersGetRequestDto,
  ClustersClustersGetResponseDto,
  SpotSpotsGetRequestDto,
  SpotSpotsGetResponseDto,
} from '@slackmap/api-client';
import { SpotsService, ClustersService } from '../services';
import { ValidationError } from '@slackmap/api/common';
import { Observable } from 'rxjs';
import { map, catchError, tap, take } from 'rxjs/operators';

/**
 * query map clusters
 */
@Controller()
export class ClustersController {
  constructor(
    private spotService: SpotsService,
    private clusterService: ClustersService,
  ) {}

  /**
   * query cluster by bbox
   */
  @Get(ClustersPaths.CLUSTERS)
  @UsePipes(ValidationPipe)
  clustersGet(@Query() request: ClustersClustersGetRequestDto): Observable<ClustersClustersGetResponseDto> {
    const bbox = request.bbox.split(',');
    return this.clusterService.query(bbox, request.zoom).pipe(
      catchError((err) => {
        console.error('SpotController.clustersGet()', 'zoom', request.zoom, 'bbox', request.bbox, err);
        return [];
      }),
      map(clusters => ({clusters})),
    );
  }

  /**
   * Get spots for map by geohash
   */
  @Get(ClustersPaths.SPOTS)
  async clustersSpotsGet(
    @Query() request: SpotSpotsGetRequestDto,
  ): Promise<SpotSpotsGetResponseDto> {
    return this.spotService.getByHash(request);
  }
}
