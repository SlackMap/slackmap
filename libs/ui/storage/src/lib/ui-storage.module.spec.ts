import { async, TestBed } from '@angular/core/testing';
import { UiStorageModule } from './ui-storage.module';

describe('UiStorageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiStorageModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiStorageModule).toBeDefined();
  });
});
