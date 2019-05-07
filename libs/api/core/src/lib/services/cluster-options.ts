import { Injectable } from '@nestjs/common';

@Injectable()
export class ClusterOptions {
  radius = 60;
  maxZoom = 16;
  log = false;
}
