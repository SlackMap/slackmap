import { Directive, HostListener } from '@angular/core';
import { AuthFacade, AuthActions } from '../+auth';

@Directive({
  selector: '[authSignIn]'
})
export class SignInDirective {

  constructor(
    private authFacade: AuthFacade,
  ) { }

  @HostListener('click', ['$event'])
  onClick($event) {
    this.authFacade.dispatch(AuthActions.signIn())
  }
}
