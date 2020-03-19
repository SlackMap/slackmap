import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class CloseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest() as Request;

    const close$ = fromEvent(request, 'close');

    return next.handle().pipe(takeUntil(close$));
  }
}
