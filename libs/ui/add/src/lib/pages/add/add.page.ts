import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@slackmap/ui/auth';
import { SubSink, SportType } from '@slackmap/core';
import { MapService, DrawType, DrawGeometry } from "@slackmap/ui/map";
import { AddFacade, AddActions } from '../../+add';

@Component({
  selector: 'add-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss']
})
export class AddPage implements OnInit, OnDestroy {
  edited: DrawGeometry;
  subSink = new SubSink();
  user$ = this.authFacade.user$;
  DrawType = DrawType;
  SportType = SportType;
  type: DrawType = DrawType.LINE;
  geometry: DrawGeometry;

  constructor(
    private mapService: MapService,
    public authFacade: AuthFacade,
    public addFacade: AddFacade,
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
  reset() {
    this.addFacade.dispatch(AddActions.reset())
  }
}
