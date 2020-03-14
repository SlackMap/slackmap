import { async, TestBed } from '@angular/core/testing';
import { PwaModule } from './pwa.module';

describe('PwaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PwaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PwaModule).toBeDefined();
  });
});
