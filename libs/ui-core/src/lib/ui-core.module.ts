import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  USER_FEATURE_KEY,
  userInitialState as userInitialState,
  userReducer,
} from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { UserFacade } from './state/user/user.facade';
import * as fromMap from './state/map/map.reducer';
import { MapEffects } from './state/map/map.effects';
import * as fromSpots from './state/spots/spots.reducer';
import { SpotsEffects } from './state/spots/spots.effects';
import { HomeModule } from './pages/home';
import { MapModule } from './pages/map';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, {
      initialState: userInitialState,
    }),
    EffectsModule.forFeature([UserEffects, MapEffects, SpotsEffects]),
    StoreModule.forFeature(fromMap.MAP_FEATURE_KEY, fromMap.reducer),
    StoreModule.forFeature(fromSpots.SPOT_FEATURE_KEY, fromSpots.reducer),
    MapModule,
    HomeModule,
  ],
  providers: [UserFacade],
  exports: [],
})
export class UiCoreModule {}
