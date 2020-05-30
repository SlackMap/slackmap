import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@slackmap/ui/auth';
import { SubSink } from '@slackmap/core';
import { MapService, DrawType } from "@slackmap/ui/map";

@Component({
  selector: 'add-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss']
})
export class AddPage implements OnInit, OnDestroy {

  subSink = new SubSink();
  user$ = this.authFacade.user$;

  constructor(
    private mapService: MapService,
    public authFacade: AuthFacade
  ) { }

  ngOnInit(): void {

    this.subSink.add = this.mapService.drawHandler(DrawType.LINE).subscribe(handler => {
      console.log('handler', handler)
    })
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
