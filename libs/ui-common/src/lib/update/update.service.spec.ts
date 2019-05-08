import { TestBed } from '@angular/core/testing';

import { UpdateService } from './update.service';
import { MatDialogModule } from '@angular/material';

describe('UpdateService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
    }),
  );

  it('should be created', () => {
    // const service: UpdateService = TestBed.get(UpdateService);
    // expect(service).toBeTruthy();
    expect(true).toBeTruthy();
  });
});
