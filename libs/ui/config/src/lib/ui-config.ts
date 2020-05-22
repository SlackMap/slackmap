import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ConfigModel } from '@slackmap/api-client';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class UiConfig extends ConfigModel {
  isProduction: boolean;
  isBrowser = isPlatformBrowser(this.platformId)
  isServer = isPlatformServer(this.platformId)

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
  ) { super() }
};
