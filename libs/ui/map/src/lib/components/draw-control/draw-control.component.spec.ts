import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawControlComponent } from './draw-control.component';

describe('DrawControlComponent', () => {
  let component: DrawControlComponent;
  let fixture: ComponentFixture<DrawControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
