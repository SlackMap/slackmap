import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AppData {
  version: string;
}
export interface Version {
  hash: string;
  appData?: AppData;
}
export interface UpdateAvailableEvent {
  type: 'UPDATE_AVAILABLE';
  current: Version;
  available: Version;
}

@Component({
  selector: 'sm-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateAvailableEvent,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
