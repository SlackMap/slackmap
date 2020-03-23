import { async, TestBed } from '@angular/core/testing';
import { UiCoreModule } from './ui-core.module';

describe('UiCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiCoreModule).toBeDefined();
  });
});
