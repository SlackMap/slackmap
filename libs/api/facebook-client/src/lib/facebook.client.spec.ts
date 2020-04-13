import {FacebookClient} from './facebook.client';

const facebookGateway = new FacebookClient();

describe('FacebookGateway', () => {
  describe('.me(token:string)', () => {
    test('should throw Invalid OAuth Error', () => {
      const token = 'fake-token';
      return facebookGateway.me(token).then(
        fbProfile => {
          expect(true).toBeFalsy();
        },
        err => {
          expect(err).toBeDefined();
          expect(err.data).toBeDefined();
          expect(err.title).toContain('Invalid OAuth');
        }
      );
    });
  });
});
