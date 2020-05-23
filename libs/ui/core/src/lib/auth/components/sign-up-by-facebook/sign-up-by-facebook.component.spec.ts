import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpByFacebookComponent } from './sign-up-by-facebook.component';

describe('SignUpByFacebookComponent', () => {
  let component: SignUpByFacebookComponent;
  let fixture: ComponentFixture<SignUpByFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpByFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpByFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
