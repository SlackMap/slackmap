import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialog } from './login.dialog';

describe('LoginDialog', () => {
  let component: LoginDialog;
  let fixture: ComponentFixture<LoginDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
