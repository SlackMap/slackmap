import { AuthSignInByFacebookUseCase } from './auth-sign-in-by-facebook.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { FacebookClient } from '@slackmap/api/facebook';
import { FacebookClientMock, FacebookFixture } from '@slackmap/api/facebook/testing';
import { ApiAuthModule } from '../api-auth.module';
import { AuthSignInByFacebookDto } from '../dto';
import { DbTestingModule, UserFixture } from '@slackmap/api/db/testing';
import { RunWithDrivine } from '@liberation-data/drivine';

RunWithDrivine({rollback: true});

describe('auth-sign-in-by-facebook UseCase', () => {
  let usecase: AuthSignInByFacebookUseCase, module: TestingModule, userFixture: UserFixture;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ApiAuthModule, DbTestingModule],
    })
      .overrideProvider(FacebookClient)
      .useClass(FacebookClientMock)
      .compile();

    usecase = module.get(AuthSignInByFacebookUseCase);
    userFixture = module.get(UserFixture);
  });
  afterEach(async () => {
    await module.close();
  });

  test('should return fb profile', () => {
    const value: AuthSignInByFacebookDto = {
      facebookUser: expect.any(Object),
      user: null,
      users: expect.any(Array),
      apiToken: expect.any(String)
    };
    return usecase
      .process({ accessToken: FacebookFixture.VALID_PROFILE_TOKEN })
      .toPromise()
      .then(res => expect(res).toMatchObject(value));
  });
  test('should throw error: profile id is required', async () => {
    return usecase
      .process({ accessToken: FacebookFixture.INVALID_PROFILE_TOKEN })
      .toPromise()
      .then(res => expect(res).toBeFalsy())
      .catch(err => {
        expect(err.name).toBe('ValidationError');
        expect(err.title).toContain('get id of your facebook profile');
      }
      );
  });
  test('should throw error: profile not found', () => {
    return usecase
      .process({ accessToken: FacebookFixture.INVALID_TOKEN })
      .toPromise()
      .then(res => expect(res).toBeFalsy())
      .catch(err => {
        expect(err.name).toBe('ValidationError');
        expect(err.title).toContain(`We can't get your facebook profile :(`);
      }
      );
  });
  test('should return facebook profile + user', async () => {
    const facebookUser: any = FacebookFixture.getByToken(FacebookFixture.USER_PROFILE_TOKEN)
    await userFixture.createFakeUser({facebookId: facebookUser.id})
    const value: AuthSignInByFacebookDto = {
      facebookUser: expect.any(Object),
      user: expect.any(Object),
      users: expect.any(Array),
      apiToken: expect.any(String)
    };
    return usecase
      .process({
        accessToken: FacebookFixture.USER_PROFILE_TOKEN
      })
      .toPromise()
      .then(res => {
        expect(res).toMatchObject(value);
        expect(res.users).toHaveLength(1);
      });
  });
});
