import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UpdateService } from './update.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { PwaModuleConfig } from './pwa-module-config';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [UpdateDialogComponent],
  entryComponents: [UpdateDialogComponent],
})
export class UiPwaModule {
  static forRoot(config: PwaModuleConfig): ModuleWithProviders {
    return {
      ngModule: UiPwaModule,
      providers: [{
        provide: PwaModuleConfig,
        useValue: config
      }]
    }
  }
  constructor(service: UpdateService) {}
}
