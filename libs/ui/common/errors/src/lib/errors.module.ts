import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialog } from './dialogs/error/error.dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ErrorService } from './error.service';
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ErrorService],
  declarations: [ErrorDialog],
  // exports: [ErrorService],
})
export class ErrorsModule {}
