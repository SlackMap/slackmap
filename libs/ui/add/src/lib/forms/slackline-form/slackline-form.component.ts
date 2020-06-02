import { Component, OnInit } from '@angular/core';
import { AddFacade, AddActions } from '../../+add';
import { DrawType, DrawData } from '@slackmap/ui/map';

@Component({
  selector: 'add-slackline-form',
  templateUrl: './slackline-form.component.html',
  styleUrls: ['./slackline-form.component.scss']
})
export class SlacklineFormComponent implements OnInit {

  DrawType = DrawType;
  drawType$ = this.addFacade.drawType$;
  drawData$ = this.addFacade.drawData$;
  constructor(
    public addFacade: AddFacade,
  ) { }

  ngOnInit(): void {
  }
  reset() {
    this.addFacade.dispatch(AddActions.reset())
  }
  drawTypeChange(drawType: DrawType) {
    this.addFacade.dispatch(AddActions.setDrawType({drawType}))
  }
  onDrawData(drawData: DrawData) {
    console.log('drawdata', drawData)
    this.addFacade.dispatch(AddActions.setDrawData({drawData}))
  }
}
