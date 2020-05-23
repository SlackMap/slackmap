import { Component, OnInit, Inject } from '@angular/core';
import { AuthConnectFacebookDto, AuthRegisterByFacebookRequestDto } from '@slackmap/api-client';
import { AuthFacade } from '../../+auth/auth.facade';

@Component({
  selector: 'sm-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnInit {

  public fbConnectData: AuthConnectFacebookDto;

  constructor(
    public auth: AuthFacade,
  ) { }

  ngOnInit(): void {

  }
  async signUpByFacebookCancel(): Promise<void> {
    this.auth.dispatch(this.auth.actions.signUpByFacebookCancel());
  }
  async signUpByFacebook(data: AuthRegisterByFacebookRequestDto): Promise<void> {
    this.auth.dispatch(this.auth.actions.signUpByFacebook(data));
    console.log('Sign UP', data)
  }
  async fbLogin(): Promise<void> {
    this.auth.dispatch(this.auth.actions.fbLogin());
  }


}
