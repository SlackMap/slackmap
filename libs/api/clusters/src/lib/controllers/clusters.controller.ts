import { Controller, Query, Get, ValidationPipe, UsePipes, Param } from '@nestjs/common';
import {
  CLUSTERS_PATHS,
  ClustersClustersGetRequestDto,
  ClustersClustersGetDto,
  ClustersSpotsGetRequestDto,
  ClustersSpotsGetDto,
} from '@slackmap/api-client';
import { SpotsService, ClustersService } from '../services';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
  @Get(CLUSTERS_PATHS.clustersGet())
  @UsePipes(ValidationPipe)
  clustersGet(@Query() request: ClustersClustersGetRequestDto): Observable<ClustersClustersGetDto> {
    const bbox = request.bbox.split(',');
    return this.clusterService.query(request.sport, bbox, request.zoom).pipe(
      catchError((err) => {
        console.error('ClustersController.clustersGet()', 'zoom', request.zoom, 'bbox', request.bbox, err);
        return [];
      }),
      map(clusters => ({clusters})),
    );
  }

  /**
   * Get spots for map by geohash
   */
  @Get(CLUSTERS_PATHS.spotsGet())
  @UsePipes(ValidationPipe)
  clustersSpotsGet(@Query() request: ClustersSpotsGetRequestDto): Observable<ClustersSpotsGetDto> {
    return this.spotService.getByHash(request);
  }
}
