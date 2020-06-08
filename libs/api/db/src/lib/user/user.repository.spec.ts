import { Test, TestingModule } from '@nestjs/testing';
import { RidGenerator, ItemType, ItemSubtype } from '@slackmap/core';
import { UserFixture, DbTestingModule } from '../../testing';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { RunWithDrivine } from '@liberation-data/drivine';

RunWithDrivine({rollback: true});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userFixture: UserFixture;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        DbTestingModule,
      ],
      providers: [
        UserRepository,
        {
          provide: RidGenerator,
          useClass: RidGenerator
        }
      ],
    }).compile();
    // module.useLogger(new Logger())
    userRepository = module.get(UserRepository);
    userFixture = module.get(UserFixture);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be UserRepository instance', () => {
    expect(userRepository).toBeInstanceOf(UserRepository);
  });

  it('should be UserFixture instance', () => {
    expect(userFixture).toBeInstanceOf(UserFixture);
  });

  describe('.create()', () => {

    it('should create new user', async () => {

      const data = userFixture.generateFakeUserData();
      const user = await userRepository.create(data);
      const res: UserEntity = {
        rid: expect.any(String),
        type: ItemType.USER,
        subtype: ItemSubtype.USER_USER,
        email: expect.stringMatching(data.email),
        facebookId: expect.stringMatching(data.facebookId),
        lastName: expect.stringMatching(data.lastName),
        firstName: expect.stringMatching(data.firstName),
        name: expect.stringMatching(data.name),
      };

      expect(user).toMatchObject(res)
    });
  });
  describe('.update()', () => {

    it('should update user', async () => {

      const data = await userFixture.createFakeUser();
      const name = 'new name'
      const updated = await userRepository.update(data.rid, {name});

      const res: UserEntity = {
        rid: expect.any(String),
        type: ItemType.USER,
        subtype: ItemSubtype.USER_USER,
        email: expect.stringMatching(data.email),
        facebookId: expect.stringMatching(data.facebookId),
        lastName: expect.stringMatching(data.lastName),
        firstName: expect.stringMatching(data.firstName),
        name: expect.stringMatching(name),
      };

      expect(updated).toMatchObject(res)
    });
  });
  describe('.findOne()', () => {

    it('should find one user', async () => {

      const data2 = await userFixture.createFakeUser();
      const data = await userFixture.createFakeUser();

      const user = await userRepository.findOne({facebookId: data.facebookId});

      expect(user).toMatchObject(data)
    });
    it('should not find any user & return null', async () => {

      const data2 = await userFixture.createFakeUser();
      const data = await userFixture.createFakeUser();

      const user = await userRepository.findOne({facebookId: 'sdf9876543'});

      expect(user).toBeNull()
    });
  });

  describe('.find()', () => {

    it('should find all users', async () => {
      const name = 'test-find'
      const data = await userFixture.createFakeUser({name});
      const data2 = await userFixture.createFakeUser({name});
      const data3 = await userFixture.createFakeUser();

      const users = await userRepository.find({name});

      expect(users.length).toBe(2)
      expect(users[0].name).toBe(name)
      expect(users[1].name).toBe(name)
    });
  });

});
