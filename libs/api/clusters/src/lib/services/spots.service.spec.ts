import { Test, TestingModule } from '@nestjs/testing';
import { SpotsService } from './spots.service';
import { OrientModule } from '@slackmap/api/orient';
import { SportType } from '@slackmap/core';

describe('SpotService', () => {
  let service: SpotsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OrientModule],
      providers: [SpotsService],
    }).compile();

    service = module.get<SpotsService>(SpotsService);
  });

  afterEach(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of spots', async () => {
    let bbox = [            // bbox of poland in geojson format
      15.281982421875,    // _southWest.lng
      49.95121990866204,  //_southWest.lat
      24.071044921875,    // _northEast.lng
      54.85131525968609,  //_northEast.lat
    ]
    let hash = 'u3qcjc'; // Pole Mokotowskie, Warsaw, Poland
    const res = await service.getByHash({hash, sport: SportType.SLACKLINE}).toPromise();
    expect(res.spots instanceof Array).toBeTruthy();
    expect(res.spots.length).toBeGreaterThan(0);
    expect(res.spots[0].name).toBe('Pole Mokotowskie');
  });
});
