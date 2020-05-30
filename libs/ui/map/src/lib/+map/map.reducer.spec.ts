// import { MapEntity } from './map.models';
// import * as MapActions from './map.actions';
// import { MapState, initialState, reducer } from './map.reducer';

// describe('Map Reducer', () => {
//   const createMapEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`
//     } as MapEntity);

//   beforeEach(() => {});

//   describe('valid Map actions', () => {
//     it('loadMapSuccess should return set the list of known Map', () => {
//       const map = [
//         createMapEntity('PRODUCT-AAA'),
//         createMapEntity('PRODUCT-zzz')
//       ];
//       const action = MapActions.loadMapSuccess({ map });

//       const result: MapState = reducer(initialState, action);

//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toBe(2);
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       const action = {} as any;

//       const result = reducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });
