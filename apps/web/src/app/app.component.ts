import { Component } from '@angular/core';
import { ApiService } from '@slackmap/ui/api';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data$ = this.api.getConfig()

  constructor(private api: ApiService) {}

}
