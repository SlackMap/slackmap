import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerFiltersComponent } from './layer-filters.component';

describe('LayerFiltersComponent', () => {
  let component: LayerFiltersComponent;
  let fixture: ComponentFixture<LayerFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
