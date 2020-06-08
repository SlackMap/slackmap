import { ConfigModel } from '../models';

export const CONFIG_PATHS = {
  configGet: () => 'config',
  configJson: () => 'config.json',
}

export class ConfigGetDto {
  config: ConfigModel;
}

