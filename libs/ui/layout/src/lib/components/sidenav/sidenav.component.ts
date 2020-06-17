import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthFacade, AuthActions } from '@slackmap/ui/auth';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'sm-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  imperial$ = this.authFacade.imperial$;

  @ViewChild('drawer')
  public drawer;

  constructor(
    public authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
  }

  onImperialChange(event: MatCheckboxChange) {
    this.authFacade.dispatch(AuthActions.updateSettings({settings:{imperial: event.checked}}));
  }
  onSignIn() {
    this.authFacade.dispatch(AuthActions.signIn());
  }
  onSignOut() {
    this.authFacade.dispatch(AuthActions.signOut());
  }
}
