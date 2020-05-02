import { Test, TestingModule } from '@nestjs/testing';
import { AuthRegisterByFacebookUseCase } from './auth-register-by-facebook.usecase';
import { AuthRegisterByFacebookRequestDto, AuthRegisterByFacebookDto } from '../dto';
import { ApiAuthModule } from '../api-auth.module';
import { AuthService } from '../services';
import { JwtPayloadModel } from '../models';
import { ApiAuthTestingModule, UserFixture } from '../../testing';
import { Gender } from '@slackmap/core';

describe('AuthRegisterByFacebookUseCase', () => {
  let module: TestingModule;
  let usecase: AuthRegisterByFacebookUseCase;
  let authService: AuthService;
  let userFixture: UserFixture;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ApiAuthModule, ApiAuthTestingModule]
    })
      // .overrideProvider()
      // .useClass()
      .compile();
    usecase = module.get(AuthRegisterByFacebookUseCase);
    authService = module.get(AuthService);
    userFixture = module.get(UserFixture);
  });

  afterAll(async () => {
    await module.close();
  });

  test('should update existing user', async () => {
    const payload: JwtPayloadModel = {
      facebookUser: {
        email: "pedro.blaszczak@gmail.com",
        id: "1278937090",
        name: 'Testo Maniak',
        first_name: 'Testo',
        last_name: 'Maniak',
      },
      user: null,
      users: [],
    };
    const token = authService.sign(payload);
    const requestDto: AuthRegisterByFacebookRequestDto = {
      token,
      email: '',
      firstName: '',
      lastName: '',
      gender: Gender.MALE
    };
    const responseDto: AuthRegisterByFacebookDto = {
      user: expect.any(Object),
      users: expect.any(Array),
      apiToken: expect.any(String)
    };
    return usecase
      .process(requestDto)
      .then(res => {
        expect(res).toMatchObject(responseDto);
      });
  });

  test('should work', async () => {
    const payload: JwtPayloadModel = {
      facebookUser: {
        email: UserFixture.fakeEmail(),
        id: UserFixture.fakeFacebookId(),
        name: 'Testo Maniak',
        first_name: 'Testo',
        last_name: 'Maniak',
      },
      user: null,
      users: [],
    };
    const token = authService.sign(payload);
    const requestDto: AuthRegisterByFacebookRequestDto = {
      token,
      email: '',
      firstName: '',
      lastName: '',
      gender: Gender.MALE
    };
    const responseDto: AuthRegisterByFacebookDto = {
      user: expect.any(Object),
      users: expect.any(Array),
      apiToken: expect.any(String)
    };
    return usecase
      .process(requestDto)
      .then(res => {
        expect(res).toMatchObject(responseDto);
      });
  });
});
