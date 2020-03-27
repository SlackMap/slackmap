import { async, TestBed } from '@angular/core/testing';
import { UiMapModule } from './ui-map.module';

describe('UiMapModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiMapModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiMapModule).toBeDefined();
  });
});
