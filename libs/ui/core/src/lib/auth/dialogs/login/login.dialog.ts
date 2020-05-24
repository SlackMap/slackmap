import { Component, OnInit, Inject } from '@angular/core';
import { AuthSignInByFacebookDto, AuthSignUpByFacebookRequestDto } from '@slackmap/api-client';
import { AuthFacade } from '../../+auth/auth.facade';

@Component({
  selector: 'sm-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnInit {

  public fbConnectData: AuthSignInByFacebookDto;

  constructor(
    public auth: AuthFacade,
  ) { }

  ngOnInit(): void {

  }
  async signUpByFacebookCancel(): Promise<void> {
    this.auth.dispatch(this.auth.actions.signUpByFacebookCancel());
  }
  async signUpByFacebook(data: AuthSignUpByFacebookRequestDto): Promise<void> {
    this.auth.dispatch(this.auth.actions.signUpByFacebook(data));
    console.log('Sign UP', data)
  }
  async fbLogin(): Promise<void> {
    this.auth.dispatch(this.auth.actions.fbLogin());
  }


}
