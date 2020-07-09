import { Component, OnInit } from '@angular/core';
import { CoreFacade } from '@slackmap/ui/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { MapService } from '@slackmap/ui/map';
import { from, Observable, EMPTY, Subscription } from 'rxjs';
import { SpotFacade } from '@slackmap/ui/spot';
import { SportType } from '@slackmap/core';

@Component({
  selector: 'sm-selected-sport-layers',
  template: `{{layers$ | async}}`,
})
export class SelectedSportLayersComponent implements OnInit {

  public layers$ = this.coreFacade.selectedSports$.pipe(
    map(os => os.map(o => o.id)),
    mergeMapCached((sport: SportType) => this.mapService.spotsLayer(this.spotFacade.getSportFilteredSpots(sport))),
  );

  constructor(
    public mapService: MapService,
    public coreFacade: CoreFacade,
    public spotFacade: SpotFacade,
  ) { }

  ngOnInit(): void {
  }

}

/**
 * Init the same stream for the same value
 *
 * @param factoryFn
 */
export function mergeMapCached(factoryFn: (value: SportType) => Observable<void>): (in$: Observable<SportType[]>) => Observable<any> {
  return (in$: Observable<SportType[]>) => {
    const cache: {[key: string]: Subscription} = {};
    return new Observable(subscriber => {
      function create(ids: SportType[]) {
        // add new subscriptions
        ids.forEach(id => {
          if(cache[id]) return;
          cache[id] = factoryFn(id).subscribe({
            next: (v) => subscriber.next(v),
            error: (err) => { delete cache[id] },
            complete: () => { delete cache[id] }
          });
        })
        // remove missing subscriptions
        Object.keys(cache).forEach(key => {
          if(!ids.includes(parseInt(key, 10))) {
            cache[key].unsubscribe();
            delete cache[key];
          }
        })
      }
      function end() {
        Object.values(cache).forEach(s => s.unsubscribe())
      }
      const sub = in$.subscribe({
        next: (ids) => create(ids),
        error: (e) => end(),
        complete: () => end(),
      });

      return () => sub.unsubscribe();
    });
  }
}
