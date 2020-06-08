import { Component, ElementRef, OnInit, Renderer2, HostBinding } from '@angular/core';
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
    icons: MatIconRegistry, sanitizer: DomSanitizer,
    private el: ElementRef,
  ) {
    // SlackMap icons example usage
    // <mat-icon svgIcon="icon-facebook-square"></mat-icon>
    // list: http://localhost:4200/assets/icons/demo.html
    icons.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/icons.svg'));
  }

  /**
   * Get version of current running app, it's from the <sm-root> data-sm-version attribute
   */
  get version() {
    if(this.el.nativeElement?.dataset?.smVersion) {
      return this.el.nativeElement.dataset.smVersion;
    }
  }
}
