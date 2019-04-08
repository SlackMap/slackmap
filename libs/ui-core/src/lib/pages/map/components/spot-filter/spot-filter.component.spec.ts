import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotFilterComponent } from './spot-filter.component';

describe('SpotFilterComponent', () => {
  let component: SpotFilterComponent;
  let fixture: ComponentFixture<SpotFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
