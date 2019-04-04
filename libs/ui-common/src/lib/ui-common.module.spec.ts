import { async, TestBed } from '@angular/core/testing';
import { UiCommonModule } from './ui-common.module';

describe('UiCommonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiCommonModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiCommonModule).toBeDefined();
  });
});
