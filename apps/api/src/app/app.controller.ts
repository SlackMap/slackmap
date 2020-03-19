import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ConfigPaths } from "@slackmap/api-client";
import { OrientService } from '@slackmap/api/orient';
import { catchError } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly db: OrientService,
  ) {}

  /**
   * Main page
   */
  count = 0;
  @Get()
  main() {
    this.count++;
    // this.db.liveQuery('select from Log').subscribe({
    //   next: v => console.log(this.count, 'next', v),
    //   error: v => console.log(this.count, 'error', v),
    //   complete: () => console.log(this.count, 'complete')
    // })
    return {message: 'it is working', count: this.count}
  }

  /**
   * Config
   */
  @Get(ConfigPaths.CONFIG)
  getData() {
    // this.db.command('INSERT INTO Log set message = "test log" ').subscribe({
    //   error: (err) => console.error('INSERT ERROR', err)
    // })
    return this.db.queryAll('SELECT name, lat,lon,created_at from Item LIMIT 20')//.pipe(catchError(err => [{message: err.message}]))
    // return this.appService.getData();
  }
}
