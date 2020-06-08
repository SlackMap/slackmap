import { SpotModel } from './api-spot.model';

export const SPOT_PATHS = {
  save: () => 'spot/save'
}

export class SpotSaveRequestDto {
  spot: SpotModel;
}
export class SpotSaveDto {
  spot: SpotModel;
}
