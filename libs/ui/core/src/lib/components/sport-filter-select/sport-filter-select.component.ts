import { Component, OnInit } from '@angular/core';
import { CoreFacade, CoreActions } from '../../+core';
import { SportType, ItemSubtype, SportOption, SubtypeOption } from '@slackmap/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sm-sport-filter-select',
  templateUrl: './sport-filter-select.component.html',
  styleUrls: ['./sport-filter-select.component.scss']
})
export class SportFilterSelectComponent implements OnInit {

  sports$ = this.coreFacade.sports$;

  subtypes$ = this.coreFacade.subtypes$.pipe(
    map(s => s.filter(t => t.color)),
    // map(options => options.map(o => o.id)),
  );

  selectedSports$ = this.coreFacade.selectedSports$.pipe(
    map(options => options[0]) // comment out when multiple sports supported
  );
  selectedSubtypes$ = this.coreFacade.selectedSubtypes$;

  constructor(
    private coreFacade: CoreFacade,
  ) { }

  ngOnInit() {

  }

  clearFilters() {
    this.onSubtypeChange([]);
  }

  onSportChange(selectedSportOptions: SportOption) {
    if(!selectedSportOptions) return;
    // const selectedSportIds = selectedSportOptions.map(o => o.id); // change select to multiple if it will be possible to select multible sports
    const selectedSportIds = [selectedSportOptions.id];
    this.coreFacade.dispatch(CoreActions.sportFilterChange({ state: {selectedSportIds, selectedSubtypeIds: []} }));
  }

  onSubtypeChange(selectedSubtypeOptions: SubtypeOption[]) {
    let selectedSubtypeIds: ItemSubtype[];
    if(selectedSubtypeOptions[0] && ! selectedSubtypeOptions[0].id) {
      selectedSubtypeIds = [];
    } else {
      selectedSubtypeIds = selectedSubtypeOptions.map(o => o.id);
    }
    this.coreFacade.dispatch(CoreActions.sportFilterChange({ state: {selectedSubtypeIds} }));
  }

}
