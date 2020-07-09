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
import { CoreFacade } from '@slackmap/ui/core';

@Component({
  selector: 'sm-map-layout',
  templateUrl: './map.layout.html',
  styleUrls: ['./map.layout.scss']
})
export class MapLayout implements AfterViewInit, OnDestroy {

  showMap$ = this.coreFacade.showMap$;
  isHandset$ = this.coreFacade.isHandset$;

  selectedSports$ = this.coreFacade.selectedSports$;

  constructor(
    private app: ApplicationRef,
    private injector: Injector,
    private configFacade: ConfigFacade,
    private spotFacade: SpotFacade,
    public authFacade: AuthFacade,
    public coreFacade: CoreFacade,
    private mapService: MapService,
  ) { }

  ngAfterViewInit(): void {
    // get version from root element (AppComponent)
    const version = this.injector.get(this.app.componentTypes[0]).version;
    this.configFacade.dispatch(ConfigActions.version({version}))

    this.mapService.viewChange$.pipe(
      tap(view => this.configFacade.dispatch(MapActions.viewChange({view}))),
      untilDestroy(this),
    ).subscribe();
  }
  ngOnDestroy() {}
}
