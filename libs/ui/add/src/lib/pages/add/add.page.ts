import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@slackmap/ui/auth';

@Component({
  selector: 'add-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss']
})
export class AddPage implements OnInit {

  user$ = this.authFacade.user$;
  
  constructor(
    public authFacade: AuthFacade
  ) { }

  ngOnInit(): void {
  }

}
