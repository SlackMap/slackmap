import { async, TestBed } from '@angular/core/testing';
import { UpdateModule } from './update.module';

describe('UpdateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UpdateModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UpdateModule).toBeDefined();
  });
});
