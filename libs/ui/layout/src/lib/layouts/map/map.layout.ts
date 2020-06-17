import { Component, AfterViewInit, ApplicationRef, Injector, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { untilDestroy } from '@ngrx-utils/store';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SportType } from '@slackmap/core';
import { AuthFacade, AuthActions } from '@slackmap/ui/auth';
import { MapService, MapActions } from '@slackmap/ui/map';
import { ConfigFacade, ConfigActions } from '@slackmap/ui/config';
import { SpotFacade } from '@slackmap/ui/spot';

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
    private configFacade: ConfigFacade,
    private spotFacade: SpotFacade,
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
    this.configFacade.dispatch(ConfigActions.version({version}))

    this.mapService.spotsLayer(this.spotFacade.getSportFilteredSpots(SportType.SLACKLINE)).subscribe();

    this.mapService.viewChange$.pipe(
      tap(view => this.configFacade.dispatch(MapActions.viewChange({view}))),
      untilDestroy(this),
    ).subscribe();
  }
  ngOnDestroy() {}
}
