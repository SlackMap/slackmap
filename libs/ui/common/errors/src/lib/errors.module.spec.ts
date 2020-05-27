import { async, TestBed } from '@angular/core/testing';
import { ErrorsModule } from './errors.module';

describe('ErrorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ErrorsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ErrorsModule).toBeDefined();
  });
});
