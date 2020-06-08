const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@app/api/app.module';
import { DbTestingModule } from '@slackmap/api/db/testing';
import { ApiAuthModule } from '@slackmap/api/auth';
import { FacebookClient } from '@slackmap/api/facebook';
import { FacebookClientMock } from '@slackmap/api/facebook/testing';

export class TestBed {
  static app: TestBed;
  app: INestApplication;
  close: () => Promise<void>;
  get: <T=any, R = T>(cls: T) => R;
  request: () => request.SuperTest<request.Test>;

  static async createApp(): Promise<TestBed> {
    if (TestBed.app) {
      return TestBed.app;
    }
    const module = await Test.createTestingModule({
      imports: [
        AppModule,
        // ApiAuthModule,
        DbTestingModule
      ]
    })
      .overrideProvider(FacebookClient)
      .useClass(FacebookClientMock)
      .compile();
    // const mock = module.select(DataMockModule).get(Mock);
    const app = module.createNestApplication();
    await app.init();
    async function close() {
      // await mock.destroy();
      await app.close();
      TestBed.app = null;
    }
    function get<T=any, R = T>(cls): R {
      return app.get<T, R>(cls);
    }
    return (TestBed.app = {
      app,
      close,
      get,
      // mock,
      request: function () {
        return request(app.getHttpServer());
      }
    });
  }
}
