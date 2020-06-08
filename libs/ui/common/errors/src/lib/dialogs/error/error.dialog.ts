import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sm-error',
  templateUrl: './error.dialog.html',
  styleUrls: ['./error.dialog.scss']
})
export class ErrorDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {error: any},
    private dialog: MatDialogRef<ErrorDialog>
  ) { }

  onClose(): void {
    this.dialog.close();
  }
  ngOnInit(): void {
  }

}
