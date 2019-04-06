import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDrawComponent } from './map-draw.component';

describe('MapDrawComponent', () => {
  let component: MapDrawComponent;
  let fixture: ComponentFixture<MapDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
