import { TestBed } from "./test-bed";
import { FacebookFixture } from '@slackmap/api/facebook/testing';
import { AuthConnectFacebookRequestDto, AUTH_PATHS, AuthConnectFacebookDto } from '@slackmap/api/auth/dto';

let app: TestBed;
beforeAll(async () => {
  app = await TestBed.createApp();
});

afterAll(async () => {
  if(app) await app.close();
});

describe('Auth: Connect Facebook', () => {
  const url = '/' + AUTH_PATHS.connectFacebook();

  describe(`POST ${url}`, () => {
    it('should have validation error', () => {
      const req: AuthConnectFacebookRequestDto = {
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
      const req: AuthConnectFacebookRequestDto = {
        accessToken: FacebookFixture.USER_PROFILE_TOKEN
      };
      const resBody: AuthConnectFacebookDto = {
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

describe('Auth: Register By Facebook', () => {
  const url = '/' + AUTH_PATHS.registerByFacebook();

  describe(`POST ${url}`, () => {
    it('should have validation error', () => {
      const req: AuthConnectFacebookRequestDto = {
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

  });
});
