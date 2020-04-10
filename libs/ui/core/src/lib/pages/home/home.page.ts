import { Component, OnInit } from '@angular/core';
import { CoreFacade } from '../../+core/core.facade';

@Component({
  selector: 'sm-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  version$ = this.core.version$;

  constructor(
    private core: CoreFacade
  ) { }

  ngOnInit(): void {
  }

}
