import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawHandlerComponent } from './draw-handler.component';

describe('DrawHandlerComponent', () => {
  let component: DrawHandlerComponent;
  let fixture: ComponentFixture<DrawHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
