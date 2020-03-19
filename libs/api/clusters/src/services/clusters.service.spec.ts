import { Test, TestingModule } from '@nestjs/testing';
import { ClustersService } from './clusters.service';

describe('ClusterService', () => {
  let service: ClustersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClustersService],
    }).compile();

    service = module.get<ClustersService>(ClustersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
