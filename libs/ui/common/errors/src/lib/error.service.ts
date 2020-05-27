import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from './dialogs/error/error.dialog';

@Injectable()
export class ErrorService {

  constructor(
    private dialog: MatDialog,
  ) {}

  show(data: {error: any}) {
    console.error(data.error);
    this.dialog.open(ErrorDialog, {
      data
      // width: '50%',
      // maxWidth: '100vw',
      // maxHeight: '100vh',
    });
  }
}
