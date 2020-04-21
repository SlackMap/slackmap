import { TestBed } from '@angular/core/testing';

import { JwtTokenInterceptor } from './jwt-token.interceptor';

describe('JwtTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtTokenInterceptor = TestBed.inject(JwtTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
