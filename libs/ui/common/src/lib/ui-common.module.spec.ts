import { async, TestBed } from '@angular/core/testing';
import { UiCommonModule } from './ui-common.module';

describe('CommonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiCommonModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiCommonModule).toBeDefined();
  });
});
