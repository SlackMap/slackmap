import {Data, Params} from '@angular/router';
import {RouterReducerState} from '@ngrx/router-store';

export interface MergedRoute<P = Params, Q = Params, D = Data> {
  url: string;
  queryParams: Q;
  params: P;
  data: D;
}
export type MergedRouteReducerState = RouterReducerState<MergedRoute>;
