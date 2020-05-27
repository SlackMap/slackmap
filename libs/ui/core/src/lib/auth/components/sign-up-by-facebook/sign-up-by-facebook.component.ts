import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FacebookUserModel } from '@slackmap/api-client';
import { GENDER_OPTIONS, Gender } from '@slackmap/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sm-sign-up-by-facebook',
  templateUrl: './sign-up-by-facebook.component.html',
  styleUrls: ['./sign-up-by-facebook.component.scss']
})
export class SignUpByFacebookComponent implements OnInit {

  @Output()
  signUp = new EventEmitter<any>();
  user: FacebookUserModel;

  public genderOptions = GENDER_OPTIONS;
  public form = this.fb.group({
    apiToken: ['', Validators.required],
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  @Input()
  set apiToken(apiToken: string) {
    this.form.patchValue({
      apiToken
    });
  }
  @Input()
  set facebookUser(user: FacebookUserModel) {
    this.user = user;
    this.form.patchValue({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.signUp.next(this.form.value);
  }

}
