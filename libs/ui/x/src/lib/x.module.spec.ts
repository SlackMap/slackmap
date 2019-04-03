import { async, TestBed } from '@angular/core/testing';
import { XModule } from './x.module';

describe('XModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(XModule).toBeDefined();
  });
});
