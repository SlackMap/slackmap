import { async, TestBed } from '@angular/core/testing';
import { UiApiModule } from './ui-api.module';

describe('ApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiApiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiApiModule).toBeDefined();
  });
});
