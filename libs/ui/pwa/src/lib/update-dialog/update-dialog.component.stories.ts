import { UpdateDialogComponent } from './update-dialog.component';
import { PwaModule } from '../pwa.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Component } from '@angular/core';
import { UpdateService } from '../update.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'sm-comp',
  template: `<button (click)="onClick()">Show Dialog</button>`
})
class Comp {
  constructor(
    private service: UpdateService
  ) {
    this.onClick();
  }

  onClick(): void {
    this.service.openDialog({
      available: {
        hash: '',
        appData: {}
      },
      current: {
        hash: '',
        appData: {}
      },
      type: 'UPDATE_AVAILABLE'
    });
  }
}

export default {
  title: 'UpdateDialogComponent'
}

export const NewUpdate = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
      PwaModule.forRoot({enabled: true})
    ],
    // providers: [
    //   {provide: MatDialogRef, useValue: {}}
    //   {provide: MAT_DIALOG_DATA, useValue: {}}
    // ],
    declarations: []
  },

  component: Comp,
  // component: UpdateDialogComponent,
  props: {
  }
})
