import { SpotModel } from './api-spot.model';
import { ValidateNested } from 'class-validator';

export const SPOT_PATHS = {
  save: () => 'spot/save'
}

export class SpotSaveRequestDto {
  @ValidateNested()
  spot: SpotModel;
}
export class SpotSaveDto {
  spot: SpotModel;
}
