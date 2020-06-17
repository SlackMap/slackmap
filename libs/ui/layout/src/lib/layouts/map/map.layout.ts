import { Component, AfterViewInit, ApplicationRef, Injector, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { CoreFacade } from '@slackmap/ui/core';
import { AuthFacade, AuthActions } from '@slackmap/ui/auth';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MapService, MapActions } from '@slackmap/ui/map';
import { untilDestroy } from '@ngrx-utils/store';
import { SportType } from '@slackmap/core';

@Component({
  selector: 'sm-map-layout',
  templateUrl: './map.layout.html',
  styleUrls: ['./map.layout.scss']
})
export class MapLayout implements AfterViewInit, OnDestroy {

  imperial$ = this.authFacade.settings$.pipe(map(settings => settings.imperial))
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
    public authFacade: AuthFacade,
    private mapService: MapService,
  ) { }

  onSignIn() {
    this.authFacade.dispatch(AuthActions.signIn());
  }
  onSignOut() {
    this.authFacade.dispatch(AuthActions.signOut());
  }
  onImperialChange(event: MatCheckboxChange) {
    this.authFacade.dispatch(AuthActions.updateSettings({settings:{imperial: event.checked}}));
  }
  ngAfterViewInit(): void {
    // this.onLogin()
    // get version from root element (AppComponent)
    const version = this.injector.get(this.app.componentTypes[0]).version;
    this.coreFacade.dispatch(this.coreFacade.actions.version({version}))

    this.mapService.spotsLayer(this.coreFacade.getSportFilteredSpots(SportType.SLACKLINE)).subscribe();

    this.mapService.viewChange$.pipe(
      tap(view => this.coreFacade.dispatch(MapActions.viewChange({view}))),
      untilDestroy(this),
    ).subscribe();
  }
  ngOnDestroy() {}
}
