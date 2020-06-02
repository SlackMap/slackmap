import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlacklineFormComponent } from './slackline-form.component';

describe('SlacklineFormComponent', () => {
  let component: SlacklineFormComponent;
  let fixture: ComponentFixture<SlacklineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlacklineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlacklineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
