import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data$ = this.http.get('/api')

  constructor(private http: HttpClient) {}

}
