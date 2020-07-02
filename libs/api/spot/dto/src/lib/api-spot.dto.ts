import { SpotModel } from './api-spot.model';
import { ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export const SPOT_PATHS = {
  save: () => 'spot/save',
  get: (rid = ':rid') => `spot/${rid}`,
}

export class SpotSaveRequestDto {

  @ValidateNested()
  @Type(() => SpotModel)
  @IsDefined()
  spot: SpotModel;
}
export class SpotSaveDto {
  spot: SpotModel;
}
export class SpotGetDto {
  spot: SpotModel;
}
