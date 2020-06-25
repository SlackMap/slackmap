import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthSignInByFacebookDto, AuthSignUpByFacebookRequestDto } from '@slackmap/api/auth/dto';
import { AuthFacade } from '../../+auth/auth.facade';
import * as actions from '../../+auth/auth.actions';
import { SubSink } from '@slackmap/core';
import { Loader } from '@slackmap/ui/common/loader';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services';
import { untilDestroy } from '@ngrx-utils/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorService } from '@slackmap/ui/common/errors';

@Component({
  selector: 'auth-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnDestroy, OnInit {
  public fb = false;
  public fbLoading = false;
  public fbError: any;
  private subs = new SubSink();
  public fbConnectData: AuthSignInByFacebookDto;

  constructor(
    public auth: AuthFacade,
    public loader: Loader,
    public dialog: MatDialogRef<LoginDialog>,
    public authService: AuthService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.loadFb();
  }
  loadFb(): void {
    this.fb = false;
    this.fbError = null;
    this.fbLoading = true;
    this.authService.FB$.pipe(
      untilDestroy(this),
    ).subscribe(
      fb => {
        this.fb = true;
        this.fbLoading = false;
      },
      err => {
        this.errorService.show({error: err})
        this.fbError = true;
        this.fbLoading = false;
      }
    )
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  async signInByFacebook(): Promise<void> {
    this.subs.subscribe = this.auth.signInByFacebook().pipe(this.loader.loadingOverlay());
  }
  async signInCancel(): Promise<void> {
    this.auth.dispatch(actions.signInCancel());
  }
  async signUpByFacebookCancel(): Promise<void> {
    this.auth.dispatch(actions.signUpByFacebookCancel());
  }
  async signUpByFacebook(payload: AuthSignUpByFacebookRequestDto): Promise<void> {
    this.subs.subscribe = this.auth.signUpByFacebook(payload).pipe(this.loader.loadingOverlay());
  }


}
