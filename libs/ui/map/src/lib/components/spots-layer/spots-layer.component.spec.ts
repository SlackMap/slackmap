import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotsLayerComponent } from './spots-layer.component';

describe('SpotsLayerComponent', () => {
  let component: SpotsLayerComponent;
  let fixture: ComponentFixture<SpotsLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotsLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotsLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
