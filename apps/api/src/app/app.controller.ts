import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  count = 0;

  constructor() {}

  /**
   * API Main Page
   */
  @Get()
  main() {
    this.count++;
    return {message: 'SlackMap API is working', count: this.count}
  }
}
