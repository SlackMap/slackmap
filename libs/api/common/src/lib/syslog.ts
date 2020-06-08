import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({
  // scope: Scope.REQUEST
})
export class Syslog {
  // constructor(@Inject(REQUEST) private request: Request) {
  //   console.log('new logger', request.url);
  // }
}
