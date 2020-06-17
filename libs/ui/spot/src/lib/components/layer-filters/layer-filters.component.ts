import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SportType, SUBTYPE_OPTIONS, SPORT_OPTIONS, ItemSubtype } from '@slackmap/core';
import { of } from 'rxjs';
import { SpotFacade, SpotsActions } from '../../+spot';

@Component({
  selector: 'spot-layer-filters',
  templateUrl: './layer-filters.component.html',
  styleUrls: ['./layer-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerFiltersComponent implements OnInit {

  sports$ = of(SPORT_OPTIONS);
  subtypes$ = of(SUBTYPE_OPTIONS.filter(t => t.color));

  sportsEnabled$ = this.spotFacade.sportsEnabled$;
  subtypesEnabled$ = this.spotFacade.subtypesEnabled$;

  constructor(
    private spotFacade: SpotFacade,
  ) { }

  ngOnInit() {

  }

  onSportChange(sportsEnabled: SportType[]) {
    this.spotFacade.dispatch(SpotsActions.sportsEnabledChange({ sportsEnabled }));
  }

  onSubtypeChange(subtypesEnabled: ItemSubtype[]) {
    this.spotFacade.dispatch(SpotsActions.subtypesEnabledChange({ subtypesEnabled }));
  }

}
