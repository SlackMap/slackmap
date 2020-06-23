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

  user$ = this.authFacade.user$;
  drawType$ = this.addFacade.drawType$;
  spot$ = this.addFacade.spot$;
  data$ = this.addFacade.data$;

  SportType = SportType;

  constructor(
    public authFacade: AuthFacade,
    public addFacade: AddFacade,
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {}

}
