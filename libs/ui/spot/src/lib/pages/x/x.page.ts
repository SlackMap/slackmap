import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService, DrawType } from '@slackmap/ui/map';
import { SubSink, SportType } from '@slackmap/core';
import { MapActions } from '@slackmap/ui/map';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'spot-x',
  templateUrl: './x.page.html',
  styleUrls: ['./x.page.scss']
})
export class XPage implements OnInit, OnDestroy {

  subSink = new SubSink();

  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit(): void {


  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
