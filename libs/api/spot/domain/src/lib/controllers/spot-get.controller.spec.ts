import { Test, TestingModule } from '@nestjs/testing';
import { SpotGetController } from './spot-get.controller';

describe('SpotGet Controller', () => {
  let controller: SpotGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotGetController],
    }).compile();

    controller = module.get<SpotGetController>(SpotGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
