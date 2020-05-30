import { Component, AfterViewInit, ApplicationRef, Injector } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CoreFacade } from '../../+core/core.facade';
import { AuthFacade, AuthActions } from '@slackmap/ui/auth';

@Component({
  selector: 'sm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  showMap = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private app: ApplicationRef,
    private injector: Injector,
    private coreFacade: CoreFacade,
    public authFacade: AuthFacade
  ) { }

  onSignIn() {
    this.authFacade.dispatch(AuthActions.signIn());
  }
  onSignOut() {
    this.authFacade.dispatch(AuthActions.signOut());
  }
  ngAfterViewInit(): void {
    // this.onLogin()
    // get version from root element (AppComponent)
    const version = this.injector.get(this.app.componentTypes[0]).version;
    this.coreFacade.dispatch(this.coreFacade.actions.version({version}))
  }
}
