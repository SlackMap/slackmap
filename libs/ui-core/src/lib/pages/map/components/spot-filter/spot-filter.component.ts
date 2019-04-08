import { Component, OnInit } from '@angular/core';
import { SUBTYPES, LayerType } from '@slackmap/core';
import { Observable } from 'rxjs';
import { MapFacade } from '../../../../state/map';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sm-spot-filter',
  templateUrl: './spot-filter.component.html',
  styleUrls: ['./spot-filter.component.scss']
})
export class SpotFilterComponent implements OnInit {

  options = SUBTYPES.filter(t => t.color);
  filters$: Observable<any>;
  constructor(private mapFacade: MapFacade) {

    this.filters$ = this.mapFacade.selectMapLayerFilters$.pipe(
      map((filters) => {
        return filters.slackline; // TODO this is hard coded only for slackline
      })
    );
  }

  ngOnInit() {

  }

  onChange(filters: string[]) {
    // TODO when other sports will be implemented, change this
    this.mapFacade.layerFiltersChange({
      layer: LayerType.SLACKLINE,
      filters
    });
  }

}
