import { async, TestBed } from '@angular/core/testing';
import { UiSpotModule } from './ui-spot.module';

describe('UiSpotModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiSpotModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiSpotModule).toBeDefined();
  });
});
