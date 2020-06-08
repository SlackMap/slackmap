import { Test, TestingModule } from '@nestjs/testing';
import { RidGenerator, ItemType, ItemSubtype, SportType } from '@slackmap/core';
import { SpotFixture, ApiSpotTestingModule } from '@slackmap/api/spot/testing';
import { RunWithDrivine } from '@liberation-data/drivine';
import { SpotRepository } from './spot.repository';
import { SpotEntity } from './spot.entity';

RunWithDrivine({rollback: true});

describe('SpotRepository', () => {
  let spotRepository: SpotRepository;
  let spotFixture: SpotFixture;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ApiSpotTestingModule,
      ],
      providers: [
        SpotRepository,
        {
          provide: RidGenerator,
          useClass: RidGenerator
        }
      ],
    }).compile();
    // module.useLogger(new Logger())
    spotRepository = module.get(SpotRepository);
    spotFixture = module.get(SpotFixture);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be SpotRepository instance', () => {
    expect(spotRepository).toBeInstanceOf(SpotRepository);
  });

  it('should be SpotFixture instance', () => {
    expect(spotFixture).toBeInstanceOf(SpotFixture);
  });

  describe('.create()', () => {

    it('should create new row', async () => {

      const data = spotFixture.generateFakeSpotData();
      const user = await spotRepository.create(data);
      const res: Partial<SpotEntity> = {
        rid: expect.any(String),
        type: ItemType.SPOT,
        name: expect.stringMatching(data.name),
      };

      expect(user).toMatchObject(res)
    });
  });
  describe('.update()', () => {

    it('should update user', async () => {

      const data = await spotFixture.createFakeSpot();
      const name = 'new name'
      const updated = await spotRepository.update(data.rid, { name });

      const res: Partial<SpotEntity> = {
        rid: expect.any(String),
        type: ItemType.SPOT,
        name: expect.stringMatching(name),
      };

      expect(updated).toMatchObject(res)
    });
  });
  describe('.findOne()', () => {

    it('should find one row', async () => {

      const data2 = await spotFixture.createFakeSpot();
      const data = await spotFixture.createFakeSpot();

      const user = await spotRepository.findOne(data);

      expect(user).toMatchObject(data)
    });
    it('should not find any row & return null', async () => {

      const data2 = await spotFixture.createFakeSpot();
      const data = await spotFixture.createFakeSpot();

      const user = await spotRepository.findOne({ name: 'sdf9876543' });

      expect(user).toBeNull()
    });
  });

  describe('.find()', () => {

    it('should find all rows', async () => {
      const name = 'test-find'
      const data = await spotFixture.createFakeSpot({ name });
      const data2 = await spotFixture.createFakeSpot({ name });
      const data3 = await spotFixture.createFakeSpot();

      const users = await spotRepository.find({ name });

      expect(users.length).toBe(2)
      expect(users[0].name).toBe(name)
      expect(users[1].name).toBe(name)
    });
  });

  describe('.getByGeohash()', () => {
    it('should return array of spots', async () => {
      const sportType: SportType.SLACKLINE = 123123123;
      const name = 'my spot'
      const data = await spotFixture.createFakeSpots([
        {lat: 52.212524415, lon: 20.9948730469, name, sport: sportType},
        {lat: 55, lon: 44, sport: sportType},
      ]);
      const hash = 'u3qcjc'; // Pole Mokotowskie, Warsaw, Poland
      // Lat (λ)min	52.2125244140625
      // Lat (λ)max	52.218017578125
      // Lng (φ)min	20.994873046875
      // Lng (φ)max	21.005859375
      const spots = await spotRepository.getByGeohash(hash, sportType);
      expect(spots instanceof Array).toBeTruthy();
      expect(spots.length).toBe(1);
      expect(spots[0].name).toBe(name);
    });
  });

  describe('.getForClustering()', () => {
    it('should return cursor of spots', async () => {
      const sportType: SportType.SLACKLINE = 123123123;
      const data = await spotFixture.createFakeSpots([
        {lat: 55, lon: 20, sport: sportType, subtype: ItemSubtype.SPOT_HIGHLINE},
        {lat: 55, lon: 44, sport: sportType, subtype: ItemSubtype.SPOT_HIGHLINE},
        {lat: 0, lon: 0, sport: SportType.DIVING, subtype: ItemSubtype.SPOT_DIVING_POOL},
      ]);
      const cursor = await spotRepository.getForClustering(sportType);
      const count = jest.fn();
      for await (const spot of cursor) {
          expect(spot.lat).toBe(55);
          expect(spot.subtype).toBe(ItemSubtype.SPOT_HIGHLINE);
          count();
      }
      expect(count).toBeCalledTimes(2);
    });
  });
});

// const bbox = [            // bbox of Pole Mokotowskie, Warsaw, Poland in geojson format
//   15.281982421875,    // _southWest.lng
//   49.95121990866204,  //_southWest.lat
//   24.071044921875,    // _northEast.lng
//   54.85131525968609,  //_northEast.lat
// ]
