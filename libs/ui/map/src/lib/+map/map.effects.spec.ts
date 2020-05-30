// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { provideMockActions } from '@ngrx/effects/testing';
// import { provideMockStore } from '@ngrx/store/testing';

// import { NxModule, DataPersistence } from '@nrwl/angular';
// import { hot } from '@nrwl/angular/testing';

// import { MapEffects } from './map.effects';
// import * as MapActions from './map.actions';

// describe('MapEffects', () => {
//   let actions: Observable<any>;
//   let effects: MapEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         MapEffects,
//         DataPersistence,
//         provideMockActions(() => actions),
//         provideMockStore()
//       ]
//     });

//     effects = TestBed.get(MapEffects);
//   });

//   describe('loadMap$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: MapActions.loadMap() });

//       const expected = hot('-a-|', {
//         a: MapActions.loadMapSuccess({ map: [] })
//       });

//       expect(effects.loadMap$).toBeObservable(expected);
//     });
//   });
// });
