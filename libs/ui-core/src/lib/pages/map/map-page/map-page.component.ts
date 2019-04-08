import {Component, OnInit, NgZone, OnDestroy, DoCheck} from '@angular/core';
import {merge, fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, startWith, map, share, distinctUntilChanged, filter, tap, shareReplay, takeUntil} from 'rxjs/operators';
import {MapViewChangeData, MAP_ZOOM_THRESHOLD} from '@slackmap/core/api';
import {LayerType} from '@slackmap/core';
import {Title} from '@angular/platform-browser';
import { MapFacade } from '../../../state/map';

@Component({
  selector: 'sm-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public slacklineSpots$: Observable<any>;

  public line = {'type': 'LineString', 'coordinates': [[-15.864258, 28.090155], [-15.810699, 27.949526]]};
  public area = {
    'type': 'Polygon', 'coordinates':
      [[[-15.843658, 28.025925], [-15.820313, 27.892494],
      [-15.682983, 27.93982], [-15.714569, 28.045319],
      [-15.779114, 28.141027], [-15.843658, 28.025925]]]
  };


  constructor(
    private mapFacade: MapFacade,
    private title: Title
  ) {}

  ngOnInit() {
    console.log('MAP INIT');
    this.title.setTitle('Map | SlackMap');
    this.slacklineSpots$ = this.mapFacade.selectMapLayerFilteredSpots(LayerType.SLACKLINE).pipe(
      takeUntil(this.destroy$),
      debounceTime(100)
    );
  }

  ngOnDestroy() {
    console.log('MAP DESTROY');
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDraw(data) {
    console.log('draw data', data);
  }

  onViewChange(data) {
      // this.store.dispatch(new mapActions.MapViewChangeAction(data));
  }

  onItemClick(data) {
    // this.store.dispatch(new mapActions.MapItemClickAction(data));
  }

  /**
   * listend to some store actions and to some stuff on map
   */
  setupActionListeners() {
    /**
     * listen zoom to items event
     */
    // this.actions$.ofType(mapActions.MapActionTypes.MAP_ZOOM_ITEMS).subscribe((action: mapActions.MapZoomItemsAction) => {
      // fitItems(this.map, action.payload);
    // });
  }
}

