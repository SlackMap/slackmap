import { TestBed } from "./test-bed";
import { FacebookFixture } from '@slackmap/api/facebook/testing';
import { UserFixture } from '@slackmap/api/auth/testing';
import { AuthService } from '@slackmap/api/auth/domain';
import { RunWithDrivine } from '@liberation-data/drivine';
import { SPOT_PATHS, SpotSaveRequestDto, SpotSaveDto } from '@slackmap/api/spot/dto';
import { SpotFixture } from '@slackmap/api/spot/testing';

RunWithDrivine({rollback: true});

describe('Spot [e2e]', () => {
  let app: TestBed;
  let authService: AuthService;
  let userFixture: UserFixture;
  let spotFixture: SpotFixture;

  beforeAll(async () => {
    app = await TestBed.createApp();
    authService = app.get(AuthService);
    userFixture = app.get(UserFixture);
    spotFixture = app.get(SpotFixture);
  });

  afterAll(async () => {
    if(app) await app.close();
  });

  const url = '/' + SPOT_PATHS.save();

  describe(`POST ${url}`, () => {

    // validation error response
    const errorResponseBody = {
      name: 'BadRequestException',
      statusCode: 400,
      message: {
        statusCode: 400,
        error: expect.any(String),
        message: expect.any(Array),
      }
    };

    it('should have validation error for empty request', () => {
      return app
        .request()
        .post(url)
        .send({})
        .then(res => {
          expect(res.body).toMatchObject(errorResponseBody);
        });
    });

    it('should have validation error', () => {
      const spot = spotFixture.generateFakeSpotData();
      delete spot.lat;
      delete spot.lon;
      const req: SpotSaveRequestDto = {
        spot
      };

      return app
        .request()
        .post(url)
        .send(req)
        .then(res => {
          expect(res.body).toMatchObject(errorResponseBody);
        });
    });

    it('should create new spot', () => {
      const spot = spotFixture.generateFakeSpotData();
      const req: SpotSaveRequestDto = {
        spot
      };

    // validation error response
    const resBody = {
      spot: {
        rid: expect.any(String),
        bbox: expect.any(Array),
      }
    };
      return app
        .request()
        .post(url)
        .send(req)
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body).toMatchObject(resBody);
        });
    });

  });

});
