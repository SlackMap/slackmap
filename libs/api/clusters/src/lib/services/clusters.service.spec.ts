import { Test, TestingModule } from '@nestjs/testing';
import { ClustersService } from './clusters.service';
import { OrientModule } from '@slackmap/api/orient';
import { SportType, ItemType } from '@slackmap/core';

describe('ClusterService', () => {
  let service: ClustersService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [OrientModule],
      providers: [ClustersService],
    }).compile();

    service = module.get<ClustersService>(ClustersService);
  });

  afterAll(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of spots', async () => {
    let bbox = [-180, -90, 180, 90];
    let zoom = 16
    let sport = SportType.SLACKLINE;

    const clusters = await service.query(sport, bbox, zoom).toPromise();

    expect(clusters instanceof Array).toBeTruthy();
    expect(clusters.length).toBeGreaterThan(0);
    expect(clusters[0].type).toBe(ItemType.CLUSTER);
  });
});
