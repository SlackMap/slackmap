import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService, DrawType } from '@slackmap/ui/map';
import { SubSink, SportType, SpotItem } from '@slackmap/core';
import { MapActions } from '@slackmap/ui/map';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { CoreFacade } from '@slackmap/ui/core';
import { SpotFacade, SpotsActions } from '../../+spot';

@Component({
  selector: 'spot-x',
  templateUrl: './x.page.html',
  styleUrls: ['./x.page.scss']
})
export class XPage implements OnInit, OnDestroy {

  spot$ = this.spotFacade.spot$;
  
  subSink = new SubSink();

  constructor(
    private mapService: MapService,
    public coreFacade: CoreFacade,
    public spotFacade: SpotFacade,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.coreFacade.showMap(true)
    }, 10);

  }

  onItemClick(e: {item: SpotItem}): void {
    this.spotFacade.dispatch(SpotsActions.spotClick({spot: e.item}))
  }

  mapToggle(): void {
    this.coreFacade.showMapToggle();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
