import { Test, TestingModule } from '@nestjs/testing';
import { AuthSignUpByFacebookUseCase } from './auth-sign-up-by-facebook.usecase';
import { ApiAuthTestingModule, UserFixture } from '@slackmap/api/auth/testing';
import { Gender } from '@slackmap/core';
import { RunWithDrivine } from '@liberation-data/drivine/utils/TestUtils';
import { ApiAuthDomainModule } from '../api-auth-domain.module';
import { AuthService } from '@slackmap/api/auth/data';
import { JwtPayloadModel, AuthSignUpByFacebookRequestDto, AuthSignUpByFacebookDto } from '@slackmap/api/auth/dto';

RunWithDrivine({rollback: true});

describe('auth-sign-up-by-facebook UseCase', () => {
  let module: TestingModule;
  let usecase: AuthSignUpByFacebookUseCase;
  let authService: AuthService;
  let userFixture: UserFixture;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ApiAuthDomainModule, ApiAuthTestingModule]
    })
      // .overrideProvider()
      // .useClass()
      .compile();
    usecase = module.get(AuthSignUpByFacebookUseCase);
    authService = module.get(AuthService);
    userFixture = module.get(UserFixture);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should update existing user', async () => {
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
    const requestDto: AuthSignUpByFacebookRequestDto = {
      apiToken: token,
      email: '',
      firstName: '',
      lastName: '',
      gender: Gender.MALE
    };
    const responseDto: AuthSignUpByFacebookDto = {
      user: expect.any(Object),
      users: expect.any(Array),
      apiToken: expect.any(String)
    };
    return usecase
      .process(requestDto)
      .then(res => {
        expect(res).toMatchObject(responseDto);
      })
      .catch(res => {
        expect(res).toBeUndefined();
      });
  });

  // test('should work', async () => {
  //   const payload: JwtPayloadModel = {
  //     facebookUser: {
  //       email: UserFixture.fakeEmail(),
  //       id: UserFixture.fakeFacebookId(),
  //       name: 'Testo Maniak',
  //       first_name: 'Testo',
  //       last_name: 'Maniak',
  //     },
  //     user: null,
  //     users: [],
  //   };
  //   const token = authService.sign(payload);
  //   const requestDto: AuthSignUpByFacebookRequestDto = {
  //     token,
  //     email: '',
  //     firstName: '',
  //     lastName: '',
  //     gender: Gender.MALE
  //   };
  //   const responseDto: AuthSignUpByFacebookDto = {
  //     user: expect.any(Object),
  //     users: expect.any(Array),
  //     apiToken: expect.any(String)
  //   };
  //   return usecase
  //     .process(requestDto)
  //     .then(res => {
  //       expect(res).toMatchObject(responseDto);
  //     });
  // });
});
