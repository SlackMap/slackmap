import { Component, OnInit, Inject } from '@angular/core';
import { AuthSignInByFacebookDto, AuthSignUpByFacebookRequestDto } from '@slackmap/api-client';
import { AuthFacade } from '../../+auth/auth.facade';
import * as actions from '../../+auth/auth.actions';

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
    this.auth.dispatch(actions.signUpByFacebookCancel());
  }
  async signUpByFacebook(payload: AuthSignUpByFacebookRequestDto): Promise<void> {
    this.auth.dispatch(actions.signUpByFacebook({payload}));
  }
  async fbLogin(): Promise<void> {
    this.auth.dispatch(actions.fbLogin());
  }


}
