import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MapService } from '../../map.service';
import { untilDestroy } from '@ngrx-utils/store';

@Component({
  selector: 'map-item-click',
  template: ``,
  styles: [
  ]
})
export class ItemClickComponent implements OnInit, OnDestroy {

  @Output()
  itemClick = new EventEmitter<unknown>();

  constructor(
    private mapService: MapService
  ) { }

  ngOnInit(): void {

    this.mapService.itemClick$.pipe(
      untilDestroy(this),
    ).subscribe(
      e => this.itemClick.next(e),
    );

  }

  ngOnDestroy() {}
}
