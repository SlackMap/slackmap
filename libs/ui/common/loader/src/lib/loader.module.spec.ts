import { async, TestBed } from '@angular/core/testing';
import { LoaderModule } from './loader.module';

describe('LoaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoaderModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LoaderModule).toBeDefined();
  });
});
