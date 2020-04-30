import {FacebookClient} from './facebook.client';
import { httpForFacebookClient } from '../testing';
import { HttpService } from '@nestjs/common';

const facebookGateway = new FacebookClient(httpForFacebookClient as HttpService);

describe('FacebookClient', () => {
  describe('.me(token:string)', () => {
    test('should throw Invalid OAuth Error', () => {
      const token = 'fake-token';
      return facebookGateway.me(token).toPromise().then(
        fbProfile => {
          expect(true).toBeFalsy();
        },
        err => {
          expect(err).toBeDefined();
          expect(err.data).toBeDefined();
          expect(err.title).toContain(`We can't get your facebook profile :(`);
        }
      );
    });
  });
});
