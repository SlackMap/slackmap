import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderOverlayComponent } from './loader-overlay/loader-overlay.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderOverlayComponent],
  exports: [LoaderOverlayComponent],
})
export class LoaderModule {}
