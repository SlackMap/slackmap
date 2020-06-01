import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@slackmap/ui/auth';
import { SubSink } from '@slackmap/core';
import { MapService, DrawType, DrawGeometry } from "@slackmap/ui/map";

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
  type: DrawType = DrawType.LINE;
  geometry: DrawGeometry;
  geometryLine: DrawGeometry = {
    "type": "LineString",
    "coordinates": [
      [
        20.910416,
        52.321281
      ],
      [
        20.930672,
        52.30365
      ]
    ]
  };
  geometryPolygon: DrawGeometry = {
    "type": "Polygon",
    "coordinates": [
      [
        [
          20.898743,
          52.315195
        ],
        [
          20.902863,
          52.294622
        ],
        [
          20.955048,
          52.294832
        ],
        [
          20.947838,
          52.32254
        ],
        [
          20.898743,
          52.315195
        ]
      ]
    ]
  };

  constructor(
    private mapService: MapService,
    public authFacade: AuthFacade
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
