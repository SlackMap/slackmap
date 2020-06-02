import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSelectComponent } from './sport-select.component';

describe('SportSelectComponent', () => {
  let component: SportSelectComponent;
  let fixture: ComponentFixture<SportSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
