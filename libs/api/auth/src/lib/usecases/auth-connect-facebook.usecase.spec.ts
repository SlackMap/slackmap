import { AuthConnectFacebookUseCase } from './auth-connect-facebook.usecase';
import { Test } from '@nestjs/testing';

describe('auth-connect-facebook UseCase', () => {
  let usecase: AuthConnectFacebookUseCase, module;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DataModule],
      providers: [AuthConnectFacebookUseCase]
    })
      .overrideProvider(FacebookGateway)
      .useClass(FacebookGatewayMock)
      .compile();

    usecase = module.get(AuthConnectFacebookUseCase);
  });
  afterEach(() => {
    module.destroy();
  });

  test('should return fb profile', () => {
    const value = {
      facebook_profile: expect.any(Object),
      user: null,
      users: expect.any(Array),
      api_token: expect.any(String)
    };
    return usecase
      .process({
        access_token: FacebookFixture.VALID_PROFILE_TOKEN,
        signed_request: ''
      })
      .then(
        (res: AuthUserGetResponseDto) => {
          expect(res).toMatchObject(value);
        },
        err => {
          expect(err).toBeFalsy();
        }
      );
  });
  test('should throw error: profile id is required', async () => {
    return usecase
      .process({
        access_token: FacebookFixture.INVALID_PROFILE_TOKEN,
        signed_request: ''
      })
      .then(
        (res: AuthUserGetResponseDto) => {
          expect(res).toBeFalsy();
        },
        err => {
          expect(err.name).toBe('ValidationError');
          expect(err.title).toContain('get id of your facebook profile');
        }
      );
  });
  test('should throw error: profile not found', () => {
    return usecase
      .process({
        access_token: FacebookFixture.INVALID_TOKEN,
        signed_request: ''
      })
      .then(
        (res: AuthUserGetResponseDto) => {
          expect(res).toBeFalsy();
        },
        err => {
          expect(err.name).toBe('ValidationError');
          expect(err.title).toContain('Facebook token invalid');
        }
      );
  });
  test('should return facebook profile + user', () => {
    const value = {
      facebook_profile: expect.any(Object),
      user: expect.any(Object),
      users: expect.any(Array),
      api_token: expect.any(String)
    };
    return usecase
      .process({
        access_token: FacebookFixture.USER_PROFILE_TOKEN,
        signed_request: ''
      })
      .then(
        (res: AuthUserGetResponseDto) => {
          expect(res).toMatchObject(value);
          expect(res.users).toHaveLength(1);
        },
        err => {
          expect(err).toBeFalsy();
        }
      );
  });
});
