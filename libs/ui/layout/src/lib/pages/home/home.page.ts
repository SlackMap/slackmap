import { Component, OnInit } from '@angular/core';
import { ConfigFacade } from '@slackmap/ui/config';

@Component({
  selector: 'sm-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  version$ = this.configFacade.version$;

  constructor(
    private configFacade: ConfigFacade
  ) { }

  ngOnInit(): void {
  }

}
