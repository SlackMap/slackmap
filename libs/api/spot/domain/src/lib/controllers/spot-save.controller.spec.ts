import { Test } from '@nestjs/testing';
import { SpotSaveController } from './spot-save.controller';

describe('ApiSpotDomainController', () => {
  let controller: SpotSaveController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [SpotSaveController],
    }).compile();

    controller = module.get(SpotSaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
