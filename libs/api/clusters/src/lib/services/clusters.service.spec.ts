import { Test, TestingModule } from '@nestjs/testing';
import { ClustersService } from './clusters.service';
import { SportType, ItemType, ItemSubtype } from '@slackmap/core';
import { ApiClustersModule } from '../api-clusters.module';
import { RunWithDrivine } from '@liberation-data/drivine/utils/TestUtils';
import { ApiSpotTestingModule, SpotFixture } from "@slackmap/api/spot/testing";

RunWithDrivine({rollback: true});

describe('ClusterService', () => {
  let service: ClustersService;
  let spotFixture: SpotFixture;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ApiClustersModule, ApiSpotTestingModule],
      providers: [],
    }).compile();

    service = module.get(ClustersService);
    spotFixture = module.select(ApiSpotTestingModule).get(SpotFixture);
  });

  afterAll(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spotFixture).toBeDefined();
  });

  it('should return array of clusters', async () => {
    const bbox = [-180, -90, 180, 90];
    const zoom = 16
    const sport: SportType.SLACKLINE = 123123123;
    const data = await spotFixture.createFakeSpots([
      {lat: 55, lon: 20, sport, subtype: ItemSubtype.SPOT_HIGHLINE},
      {lat: 15, lon: 14, sport, subtype: ItemSubtype.SPOT_HIGHLINE},
      {lat: 0, lon: 0, sport: SportType.DIVING, subtype: ItemSubtype.SPOT_DIVING_POOL},
    ]);

    const clusters = await service.query(sport, bbox, zoom).toPromise();

    expect(clusters instanceof Array).toBeTruthy();
    expect(clusters.length).toBe(2);
    expect(clusters[0].type).toBe(ItemType.CLUSTER);
  });
});
