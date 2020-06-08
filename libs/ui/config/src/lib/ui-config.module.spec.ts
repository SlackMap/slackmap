import { async, TestBed } from '@angular/core/testing';
import { UiConfigModule } from './ui-config.module';

describe('UiConfigModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiConfigModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiConfigModule).toBeDefined();
  });
});
