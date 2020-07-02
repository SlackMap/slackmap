import { Component, OnInit } from '@angular/core';
import { AddFacade, AddActions } from '../../+add';
import { SPORT_OPTIONS, SportOption, SportType } from "@slackmap/core";

@Component({
  selector: 'add-sport-select',
  templateUrl: './sport-select.component.html',
  styleUrls: ['./sport-select.component.scss']
})
export class SportSelectComponent implements OnInit {

  sport$ = this.addFacade.sportType$;

  options = SPORT_OPTIONS.filter(s => s.id === SportType.SLACKLINE);

  constructor(
    public addFacade: AddFacade,
  ) { }

  ngOnInit(): void {
  }

}
