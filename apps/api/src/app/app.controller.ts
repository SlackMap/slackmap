import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigPaths } from "@slackmap/api-client";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(ConfigPaths.CONFIG)
  getData() {
    return this.appService.getData();
  }
}
