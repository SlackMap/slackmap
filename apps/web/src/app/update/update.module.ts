import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateService } from './update.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [UpdateDialogComponent],
  entryComponents: [UpdateDialogComponent]
})
export class UpdateModule {
  constructor(service: UpdateService) {

  }
 }
