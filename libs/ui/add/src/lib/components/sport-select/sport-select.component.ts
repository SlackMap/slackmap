import { Component, OnInit } from '@angular/core';
import { AddFacade, AddActions } from '../../+add';
import { SPORT_OPTIONS, SportOption } from "@slackmap/core";

@Component({
  selector: 'add-sport-select',
  templateUrl: './sport-select.component.html',
  styleUrls: ['./sport-select.component.scss']
})
export class SportSelectComponent implements OnInit {

  sport$ = this.addFacade.sport$;

  options = SPORT_OPTIONS;

  constructor(
    public addFacade: AddFacade,
  ) { }

  ngOnInit(): void {
  }

  onSportSelect(option: SportOption) {
    this.addFacade.dispatch(AddActions.setSport({sport: option.id}))
  }

}
