import { async, TestBed } from '@angular/core/testing';
import { UiPwaModule } from './ui-pwa.module';

describe('PwaModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiPwaModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiPwaModule).toBeDefined();
  });
});
