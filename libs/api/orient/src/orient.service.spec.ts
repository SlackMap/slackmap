import { Test, TestingModule } from '@nestjs/testing';
import { OrientService } from './orient.service';
import { OrientConfig } from './orient.config';

describe('OrientService', () => {
  let service: OrientService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [OrientService, OrientConfig]
    }).compile();
    service = module.get<OrientService>(OrientService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should close', () => {
    let m: TestingModule;
    let s: OrientService;

    beforeAll(async () => {
      m = await Test.createTestingModule({
        providers: [OrientService, OrientConfig]
      }).compile();
      s = module.get<OrientService>(OrientService);
    });

    it('should return db session', async () => {
      expect(s.acquire()).resolves.toBeDefined();
    });

    it('should close pool and client', async () => {
      await s.acquire();
      await m.close();
      expect(s['_pool']).toBeNull();
      expect(s['_client']).toBeNull();
    });
  });
});
