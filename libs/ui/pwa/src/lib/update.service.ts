import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAvailableEvent } from '@angular/service-worker';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { PwaModuleConfig } from './pwa-module-config';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(
    private dialog: MatDialog,
    private swUpdate: SwUpdate,
    private config: PwaModuleConfig,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    if(!this.config.enabled) {
      return;
    }
    if (isPlatformBrowser(platformId)) {
      swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        this.openDialog(event);
      });
      swUpdate.activated.subscribe(event => {
        console.log('update activated', event);
      });

      interval(10 * 60 * 1000).subscribe(() => swUpdate.checkForUpdate());
    }
    // this.openDialog(<any>{});
  }
  openDialog(data: UpdateAvailableEvent): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
