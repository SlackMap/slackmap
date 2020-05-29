import { async, TestBed } from '@angular/core/testing';
import { UiAddModule } from './ui-add.module';

describe('UiAddModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiAddModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiAddModule).toBeDefined();
  });
});
