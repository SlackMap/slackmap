import { Controller, Get, Header } from '@nestjs/common';
import { ConfigGetUseCase } from '../usecases';
import { CONFIG_PATHS, ConfigGetDto } from '../dto';
import { ConfigModel } from '../models';

@Controller()
export class ConfigController {
  constructor(private configGetUseCase: ConfigGetUseCase) { }

  @Get(CONFIG_PATHS.configGet())
  configGet(): Promise<ConfigGetDto> {
    return this.configGetUseCase.process();
  }

  @Get(CONFIG_PATHS.configJson())
  async configJson(): Promise<ConfigModel> {

    const {config} = await this.configGetUseCase.process();

    return config;
  }
}
