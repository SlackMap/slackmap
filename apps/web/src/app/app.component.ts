import { Component } from '@angular/core';
import { UiApiService } from '@slackmap/ui/api';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    icons: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    icons.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/icons.svg'));
  }

}
