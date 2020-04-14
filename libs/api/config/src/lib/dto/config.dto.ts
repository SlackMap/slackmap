import { ConfigModel } from '../models';

export const CONFIG_PATHS = {
  configGet: () => 'config',
}

export class ConfigGetDto {
  config: ConfigModel;
}
