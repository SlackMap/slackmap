import { async, TestBed } from '@angular/core/testing';
import { ApiModule } from './api.module';

describe('ApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ApiModule).toBeDefined();
  });
});
