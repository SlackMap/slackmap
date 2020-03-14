import {ConfigModel} from '../models';

export enum ConfigPaths {
  CONFIG = 'config',
}
export class ConfigGetResponseDto {
  config: ConfigModel;
}
