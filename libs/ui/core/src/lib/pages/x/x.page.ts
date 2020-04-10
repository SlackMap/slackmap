import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService, DrawType } from '@slackmap/ui/map';
import { SubSink, SportType } from '@slackmap/core';
import { MapFacade } from '../../+map/map.facade';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import * as MapActions from '../../+map/map.actions';

@Component({
  selector: 'sm-x',
  templateUrl: './x.page.html',
  styleUrls: ['./x.page.scss']
})
export class XPage implements OnInit, OnDestroy {

  subSink = new SubSink();

  constructor(
    private mapService: MapService,
    private mapFacade: MapFacade,
  ) { }

  ngOnInit(): void {

    this.subSink.subscribe = this.mapService.spotsLayer(this.mapFacade.getLayerFilteredSpots(SportType.SLACKLINE));

    this.subSink.subscribe = this.mapService.viewChange$.pipe(
      tap(view => this.mapFacade.dispatch(MapActions.viewChange({view})))
    )
    this.subSink.add = this.mapService.drawHandler(DrawType.LINE).subscribe(handler => {
      console.log('handler', handler)
    })
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
