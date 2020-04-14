import { Test, TestingModule } from '@nestjs/testing';
import { ClustersController } from './clusters.controller';

describe('Spot Controller', () => {
  let controller: ClustersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClustersController],
    }).compile();

    controller = module.get<ClustersController>(ClustersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
