import { TestBed } from "./test-bed";
import { FacebookFixture } from '@slackmap/api/facebook/testing';
import { AuthSignInByFacebookRequestDto, AUTH_PATHS, AuthSignInByFacebookDto, AuthSignUpByFacebookRequestDto, AuthSignUpByFacebookDto, JwtPayloadModel } from '@slackmap/api/auth/dto';
import { Gender } from '@slackmap/core';
import { UserFixture } from '@slackmap/api/db/testing';
import { AuthService } from '@slackmap/api/auth';
import { RunWithDrivine } from '@liberation-data/drivine/utils/TestUtils';

RunWithDrivine({
  transaction: {rollback: true}
});

let app: TestBed;
let authService: AuthService;
let userFixture: UserFixture;
beforeAll(async () => {
  app = await TestBed.createApp();
  authService = app.get(AuthService);
  userFixture = app.get(UserFixture);
});

afterAll(async () => {
  if(app) await app.close();
});

describe('Auth: Sign In By Facebook', () => {
  const url = '/' + AUTH_PATHS.signInByFacebook();

  describe(`POST ${url}`, () => {
    it('should have validation error', () => {
      const req: AuthSignInByFacebookRequestDto = {
        accessToken: FacebookFixture.INVALID_PROFILE_TOKEN
      };
      const resBody = {
        name: 'ValidationError',
        title: expect.any(String),
        statusCode: 422
      };

      return app
        .request()
        .post(url)
        .send(req)
        .then(res => {
          expect(res.body).toMatchObject(resBody);
          expect(res).toHaveProperty('statusCode', 422);
        });
    });

    it('should login with facebook account', () => {
      const req: AuthSignInByFacebookRequestDto = {
        accessToken: FacebookFixture.USER_PROFILE_TOKEN
      };
      const resBody: AuthSignInByFacebookDto = {
        apiToken: expect.any(String),
        users: expect.any(Array),
        user: expect.any(Object),
        facebookUser: expect.any(Object)
      };
      return app
        .request()
        .post(url)
        .send(req)
        .then(res => {
          expect(res.body).toMatchObject(resBody);
          expect(res).toHaveProperty('statusCode', 201);
        });
    });
  });
});

describe('Auth: Sign Up By Facebook', () => {
  const url = '/' + AUTH_PATHS.signUpByFacebook();

  describe(`POST ${url}`, () => {
    it('should create and return new user', () => {
      // create fake token with facebook user
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
      const requestDto: AuthSignUpByFacebookRequestDto = {
        apiToken: authService.sign(payload),
        email: '',
        firstName: '',
        lastName: '',
        gender: Gender.MALE
      };
      const responseDto: AuthSignUpByFacebookDto = {
        apiToken: expect.any(String),
        user: expect.any(Object),
        users: expect.any(Array),
      };

      return app
        .request()
        .post(url)
        .send(requestDto)
        .then(res => {
          expect(res.body).toMatchObject(responseDto);
          expect(res).toHaveProperty('statusCode', 201);
        });
    });

  });
});
