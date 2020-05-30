import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService, DrawType } from '@slackmap/ui/map';
import { SubSink, SportType } from '@slackmap/core';
import { MapActions } from '@slackmap/ui/map';
import { CoreFacade , CoreActions} from '../../+core';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'sm-x',
  templateUrl: './x.page.html',
  styleUrls: ['./x.page.scss']
})
export class XPage implements OnInit, OnDestroy {

  subSink = new SubSink();

  constructor(
    private mapService: MapService,
    private coreFacade: CoreFacade,
  ) { }

  ngOnInit(): void {

    this.subSink.subscribe = this.mapService.spotsLayer(this.coreFacade.getSportFilteredSpots(SportType.SLACKLINE));

    this.subSink.subscribe = this.mapService.viewChange$.pipe(
      tap(view => this.coreFacade.dispatch(MapActions.viewChange({view})))
    )
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
