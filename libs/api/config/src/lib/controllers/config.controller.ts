import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigGetUseCase } from '../usecases';
import { CONFIG_PATHS, ConfigGetDto } from '../dto';

@Controller()
export class ConfigController {
  constructor(private configGetUseCase: ConfigGetUseCase) { }

  @Get(CONFIG_PATHS.configGet())
  public configGet(): Observable<ConfigGetDto> {
    return this.configGetUseCase.process();
  }
}
