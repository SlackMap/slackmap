import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromCore from './core.reducer';
import * as CoreActions from './core.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { routerNavigatedAction } from '@ngrx/router-store';
import { fetch } from '@nrwl/angular';

import { DrawGeometry } from '@slackmap/ui/map';
import { UiApiService } from '@slackmap/ui/api';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { of, EMPTY, from, combineLatest } from 'rxjs';
import { ErrorService } from '@slackmap/ui/common/errors';
import { SpotService, SpotsActions } from '@slackmap/ui/spot';
import { CoreRouteParams, CoreQueryParams } from './core.models';
import { getSportOptionByName, SportType, DrawType, SportOption, ItemSubtype, SportName, getSubtypeOptionByName } from '@slackmap/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MergedRoute } from '../+router';
import { CoreFacade } from './core.facade';


@Injectable()
export class CoreEffects {

  isHandset$ = createEffect(() =>
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => CoreActions.isHandset({isHandset: result.matches})),
    )
  );

  fromRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(action => action.payload.routerState.url.indexOf('/s') === 0),
      map(action => action.payload.routerState as unknown as MergedRoute<CoreRouteParams, CoreQueryParams>),
      switchMap(route => {

        const state: Partial<fromCore.CorePartialStateForRoute> = {};

        // look for subtypes, if not present, reset the state
        if(route.params.subtypeNames) {
          state.selectedSubtypeIds = route.params.subtypeNames.split(',').map((n: string) => getSubtypeOptionByName(n)).filter(s => !!s).map(o => o.id);
        } else {
          state.selectedSubtypeIds = []
        }

        // look for sport name
        if(route.params.sportNames) {
          state.selectedSportIds = route.params.sportNames.split(',').map((n: SportName) => getSportOptionByName(n)).filter(s => !!s).map(o => o.id);
        }

        // show map
        if(typeof route.queryParams.map !== 'undefined') {
          state.showMap = true;
        }

        return from([
          CoreActions.updateFromRoute({state}),
        ]);
      }),
    )
  );
  toRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.sportFilterChange),
      switchMap(action => combineLatest([of(action.state), this.coreFacade.sports$, this.coreFacade.subtypes$, this.coreFacade.selectedSports$])),
      map(([{selectedSportIds, selectedSubtypeIds}, sports, subtypes, currentSelectedSportIds]) => {
        let sportNames: string;
        let subtypeNames: string;

        if(selectedSportIds) {
          sportNames = sports.filter(s => selectedSportIds.includes(s.id)).map(s => s.name).join(',');
        } else if(currentSelectedSportIds.length) {
          sportNames = sports.filter(s => currentSelectedSportIds.map(o => o.id).includes(s.id)).map(s => s.name).join(',');
        }

        if(!sportNames) {
          return this.router.navigate(['/s'])
        }

        if(selectedSubtypeIds) {
          subtypeNames = subtypes.filter(s => selectedSubtypeIds.includes(s.id)).map(s => s.name).join(',');
          return this.router.navigate(['/s', sportNames, subtypeNames]);
        } else if(sportNames) {
          this.router.navigate(['/s', sportNames])
        } else {

        }

      }),
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private coreFacade: CoreFacade,
  ) {}
}
