import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateService } from './update.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MatDialogModule } from '@angular/material';
import { UpdateConfig } from './update-config';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [UpdateDialogComponent],
  entryComponents: [UpdateDialogComponent],
})
export class PwaModule {
  static forRoot(config: UpdateConfig): ModuleWithProviders {
    return {
      ngModule: PwaModule,
      providers: [{
        provide: UpdateConfig,
        useValue: config
      }]
    }
  }
  constructor(service: UpdateService) {}
}
