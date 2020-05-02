import { Test, TestingModule } from '@nestjs/testing';
import { OrientConfig } from '../orient.config';
import { UserService } from './user.service';
import { RidGenerator, ItemType, ItemSubtype } from '@slackmap/core';
import { OrientService } from '../orient.service';
import { UserFixture, OrientTestingModule } from '../../testing';
import { UserEntity } from './user.schema';

describe('UserService', () => {
  let userService: UserService;
  let userFixture: UserFixture;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        OrientTestingModule,
      ],
      providers: [
        OrientService,
        OrientConfig,
        UserService,
        {
          provide: RidGenerator,
          useClass: RidGenerator
        }
      ],
    }).compile();
    userService = module.get(UserService);
    userFixture = module.get(UserFixture);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be UserService instance', () => {
    expect(userService).toBeInstanceOf(UserService);
  });

  it('should be UserFixture instance', () => {
    expect(userFixture).toBeInstanceOf(UserFixture);
  });

  describe('.create()', () => {

    it('should create new user', async () => {

      const data = userFixture.generateFakeUserData();
      const user = await userService.create(data);
      const res: UserEntity = {
        version: 1,
        id: expect.any(String),
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
      const updated = await userService.update(data.rid, {name});

      const res: UserEntity = {
        version: 2,
        id: expect.any(String),
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

});
