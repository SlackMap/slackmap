import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LayerType, SUBTYPES } from '@slackmap/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MapFacade } from '../../+map/map.facade';
import * as MapActions from '../../+map/map.actions';

@Component({
  selector: 'sm-layer-filters',
  templateUrl: './layer-filters.component.html',
  styleUrls: ['./layer-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerFiltersComponent implements OnInit {

  options = SUBTYPES.filter(t => t.color);
  filters$: Observable<any>;
  constructor(
    private mapFacade: MapFacade,
    ) {

    this.filters$ = this.mapFacade.layerFilters$.pipe(
      map((filters) => {
        return filters.slackline; // TODO this is hard coded only for slackline
      })
    );
  }

  ngOnInit() {

  }

  onChange(filters: string[]) {
    // TODO when other sports will be implemented, change this
    this.mapFacade.dispatch(MapActions.layerFiltersChange({
      layer: LayerType.SLACKLINE,
      filters
    }));
  }

}
