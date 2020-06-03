import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ConfigModel } from '@slackmap/api/config/dto';

@Injectable()
export class UiConfig extends ConfigModel {
  isProduction: boolean;
  isBrowser = isPlatformBrowser(this.platformId)
  isServer = isPlatformServer(this.platformId)

  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
  ) { super() }
};
