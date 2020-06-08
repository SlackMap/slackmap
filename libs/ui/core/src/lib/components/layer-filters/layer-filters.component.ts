import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SportType, SUBTYPE_OPTIONS, SPORT_OPTIONS, ItemSubtype } from '@slackmap/core';
import { CoreFacade, CoreActions } from '../../+core';
import { of } from 'rxjs';

@Component({
  selector: 'sm-layer-filters',
  templateUrl: './layer-filters.component.html',
  styleUrls: ['./layer-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerFiltersComponent implements OnInit {

  sports$ = of(SPORT_OPTIONS);
  subtypes$ = of(SUBTYPE_OPTIONS.filter(t => t.color));

  sportsEnabled$ = this.coreFacade.sportsEnabled$;
  subtypesEnabled$ = this.coreFacade.subtypesEnabled$;

  constructor(
    private coreFacade: CoreFacade,
  ) { }

  ngOnInit() {

  }

  onSportChange(sportsEnabled: SportType[]) {
    this.coreFacade.dispatch(CoreActions.sportsEnabledChange({ sportsEnabled }));
  }

  onSubtypeChange(subtypesEnabled: ItemSubtype[]) {
    this.coreFacade.dispatch(CoreActions.subtypesEnabledChange({ subtypesEnabled }));
  }

}
