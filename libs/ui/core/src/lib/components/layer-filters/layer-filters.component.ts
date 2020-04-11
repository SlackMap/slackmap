import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SportType, SUBTYPE_OPTIONS, SPORT_OPTIONS, ItemSubtype } from '@slackmap/core';
import { MapFacade } from '../../+map/map.facade';
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

  sportsEnabled$ = this.map.sportsEnabled$;
  subtypesEnabled$ = this.map.subtypesEnabled$;

  constructor(
    private map: MapFacade,
  ) { }

  ngOnInit() {

  }

  onSportChange(sportsEnabled: SportType[]) {
    this.map.dispatch(this.map.actions.sportsEnabledChange({ sportsEnabled }));
  }

  onSubtypeChange(subtypesEnabled: ItemSubtype[]) {
    this.map.dispatch(this.map.actions.subtypesEnabledChange({ subtypesEnabled }));
  }

}
