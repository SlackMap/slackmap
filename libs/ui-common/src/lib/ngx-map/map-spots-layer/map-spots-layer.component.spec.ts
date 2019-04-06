import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSpotsLayerComponent } from './map-spots-layer.component';

describe('MapSpotsLayerComponent', () => {
  let component: MapSpotsLayerComponent;
  let fixture: ComponentFixture<MapSpotsLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSpotsLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSpotsLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
